import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const EMAIL = process.env.FORUM_EMAIL || 'your_email@example.com';
const PASSWORD = process.env.FORUM_PASSWORD || 'your_password';

// Lấy thư mục gốc của project (vì script chạy trong Vite config)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

export async function runScraper(targetUrl, folderName) {
    console.log(`[Scraper] Bắt đầu tải ảnh từ: ${targetUrl} vào thư mục: ${folderName}`);
    
    // Sử dụng headless: true để chạy ngầm, không mở popup trình duyệt
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        console.log('[Scraper] Đang mở trang đăng nhập...');
        await page.goto('https://fuoverflow.com/login/', { waitUntil: 'domcontentloaded', timeout: 60000 });

        console.log('[Scraper] Đang điền thông tin đăng nhập...');
        await page.waitForSelector('input[name="login"]', { timeout: 15000 });
        await page.type('input[name="login"]', EMAIL);
        await page.type('input[name="password"]', PASSWORD);

        console.log('[Scraper] Đang thực hiện đăng nhập...');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 }),
            page.keyboard.press('Enter')
        ]);

        console.log('[Scraper] Đăng nhập thành công! Đang truy cập bài viết...');
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

        console.log('[Scraper] Đang quét tìm các ảnh câu hỏi...');
        await new Promise(r => setTimeout(r, 3000));

        const imageUrls = await page.evaluate(() => {
            let urls = [];
            const elements = document.querySelectorAll('a.lbContainer, a.js-lbImage, .attachment-icon a');
            elements.forEach(el => {
                if (el.href) urls.push(el.href);
            });
            return [...new Set(urls)].filter(src => src.includes('attachment') || src.includes('media'));
        });

        console.log(`[Scraper] Đã tìm thấy ${imageUrls.length} ảnh.`);

        // Tạo thư mục public/images/[folderName]
        const publicImagesDir = path.join(PROJECT_ROOT, 'public', 'images');
        if (!fs.existsSync(publicImagesDir)) {
            fs.mkdirSync(publicImagesDir, { recursive: true });
        }
        
        const targetDir = path.join(publicImagesDir, folderName);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const downloadedImages = [];

        for (let i = 0; i < imageUrls.length; i++) {
            const url = imageUrls[i];
            console.log(`[Scraper] Đang tải ảnh ${i + 1}/${imageUrls.length}...`);

            let buffer;
            try {
                const arrayBuffer = await page.evaluate(async (imgUrl) => {
                    const response = await fetch(imgUrl);
                    if (!response.ok) throw new Error(`HTTP status ${response.status}`);
                    const buf = await response.arrayBuffer();
                    return Array.from(new Uint8Array(buf));
                }, url);
                buffer = Buffer.from(arrayBuffer);
            } catch (err) {
                console.log(`[Scraper] Bỏ qua ảnh ${i + 1} do lỗi tải: ${err.message}`);
                continue;
            }

            let ext = '.jpg';
            if (url.match(/\.png(\?.*)?$/i)) ext = '.png';
            else if (url.match(/\.jpeg(\?.*)?$/i)) ext = '.jpeg';
            else if (url.match(/\.gif(\?.*)?$/i)) ext = '.gif';

            if (buffer.length > 2 && buffer[0] === 0xFF && buffer[1] === 0xD8) ext = '.jpg';
            else if (buffer.length > 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) ext = '.png';

            const filename = `image_${i + 1}${ext}`;
            const filepath = path.join(targetDir, filename);
            fs.writeFileSync(filepath, buffer);

            // Lưu trữ đường dẫn URL tĩnh để web có thể đọc được (phải bắt đầu bằng /images/...)
            downloadedImages.push(`/images/${folderName}/${filename}`);
        }

        console.log(`[Scraper] Hoàn tất tải ${downloadedImages.length} ảnh!`);
        return downloadedImages;

    } catch (error) {
        console.error('[Scraper] Có lỗi xảy ra:', error);
        throw error;
    } finally {
        await browser.close();
    }
}
