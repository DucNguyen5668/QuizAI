import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
    const EMAIL = process.env.FORUM_EMAIL || 'your_email@example.com';
    const PASSWORD = process.env.FORUM_PASSWORD || 'your_password';
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://fuoverflow.com/login/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.type('input[name="login"]', EMAIL); 
    await page.type('input[name="password"]', PASSWORD); 
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 }),
        page.keyboard.press('Enter')
    ]);

    const viewSource = await page.goto('https://fuoverflow.com/attachments/133757/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    const buffer = await viewSource.buffer();
    require('fs').writeFileSync('test_image.jpg', buffer);
    console.log('Saved test_image.jpg');
    await browser.close();
})();
