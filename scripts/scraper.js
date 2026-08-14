import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL = process.env.FORUM_EMAIL || 'your_email@example.com';
const PASSWORD = process.env.FORUM_PASSWORD || 'your_password';

async function scrapeForum() {
    console.log('Khởi động trình duyệt...');
    // headless: false để bạn có thể xem trình duyệt đang tự động làm gì
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    try {
        // 1. Đăng nhập
        console.log('Đang mở trang đăng nhập...');
        // Đổi từ networkidle2 sang domcontentloaded để tránh lỗi Timeout 30s nếu web load nhiều script ngầm
        await page.goto('https://fuoverflow.com/login/', { waitUntil: 'domcontentloaded', timeout: 60000 });

        console.log('Đang điền thông tin đăng nhập...');
        // Chờ ô login xuất hiện (phòng trường hợp mạng chậm)
        await page.waitForSelector('input[name="login"]', { timeout: 15000 });
        await page.type('input[name="login"]', EMAIL);
        await page.type('input[name="password"]', PASSWORD);

        console.log('Đang thực hiện đăng nhập...');
        await Promise.all([
            // Chờ load xong trang sau khi ấn Enter
            page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 }),
            page.keyboard.press('Enter') // Mô phỏng việc ấn phím Enter để đăng nhập (chính xác hơn việc tìm nút click)
        ]);

        console.log('Đăng nhập thành công!');

        // 2. Vào bài viết chứa đề thi
        const targetUrl = 'https://fuoverflow.com/threads/ite302c-sp26-fe.6496/';
        console.log(`Đang truy cập: ${targetUrl}`);
        await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // 3. Quét tìm tất cả các ảnh trong bài viết
        console.log('Đang quét tìm các ảnh câu hỏi...');

        // Đợi thêm 3 giây để đảm bảo toàn bộ ảnh được nạp vào giao diện (phòng trường hợp web tải chậm)
        await new Promise(r => setTimeout(r, 3000));

        const imageUrls = await page.evaluate(() => {
            let urls = [];
            // Quét TẤT CẢ các thẻ a chứa link ảnh đính kèm gốc (chất lượng cao)
            const elements = document.querySelectorAll('a.lbContainer, a.js-lbImage, .attachment-icon a');

            elements.forEach(el => {
                if (el.href) urls.push(el.href);
            });

            // Lọc ra các link ảnh đính kèm thực sự
            let finalUrls = [...new Set(urls)].filter(src => src.includes('attachment') || src.includes('media'));

            return finalUrls;
        });

        console.log(`Đã tìm thấy ${imageUrls.length} ảnh. Bắt đầu tải ảnh về...`);

        // Tạo thư mục images nếu chưa có
        const imagesDir = './images';
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir);
        }

        const downloadedImages = [];

        // 4. Lặp qua từng ảnh và tải về
        for (let i = 0; i < imageUrls.length; i++) {
            const url = imageUrls[i];
            console.log(`Đang tải ảnh ${i + 1}/${imageUrls.length}...`);

            let buffer;
            try {
                // Tải trực tiếp bằng fetch bên trong trình duyệt để giữ nguyên cookie đăng nhập
                // Và tránh lỗi bị chặn download native
                const arrayBuffer = await page.evaluate(async (imgUrl) => {
                    const response = await fetch(imgUrl);
                    if (!response.ok) throw new Error(`HTTP status ${response.status}`);
                    const buf = await response.arrayBuffer();
                    return Array.from(new Uint8Array(buf));
                }, url);

                buffer = Buffer.from(arrayBuffer);
            } catch (err) {
                console.log(`Bỏ qua ảnh ${i + 1} do lỗi tải: ${err.message}`);
                continue;
            }

            console.log(`Đang lưu ảnh ${i + 1}...`);
            try {
                // Xác định đuôi file mặc định
                let ext = '.jpg';
                if (url.match(/\.png(\?.*)?$/i)) ext = '.png';
                else if (url.match(/\.jpeg(\?.*)?$/i)) ext = '.jpeg';
                else if (url.match(/\.gif(\?.*)?$/i)) ext = '.gif';

                // Thử lấy contentType từ buffer (magic bytes) để lưu chính xác nếu url không có đuôi rõ ràng
                if (buffer.length > 2 && buffer[0] === 0xFF && buffer[1] === 0xD8) ext = '.jpg';
                else if (buffer.length > 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) ext = '.png';

                const filename = `image_${i + 1}${ext}`;
                const filepath = path.join(imagesDir, filename);
                fs.writeFileSync(filepath, buffer);

                downloadedImages.push({
                    id: `Q${i + 1}`,
                    sourceUrl: url,
                    localPath: filepath
                });
            } catch (err) {
                console.log(`=> CẢNH BÁO: Không thể lưu ảnh ${i + 1}: ${err.message}`);
            }
        }

        // 5. Lưu thông tin vào file JSON
        const jsonPath = './downloaded-images.json';
        fs.writeFileSync(jsonPath, JSON.stringify(downloadedImages, null, 2));

        console.log(`Đã tải xong!`);
        console.log(`- Ảnh được lưu tại thư mục: ${imagesDir}`);
        console.log(`- Lưu thông tin tải về tại: ${jsonPath}`);

    } catch (error) {
        console.error('Có lỗi xảy ra:', error);
    } finally {
        await browser.close();
        console.log('Hoàn tất script.');
    }
}

scrapeForum();
