import puppeteer from 'puppeteer';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

(async () => {
    const EMAIL = process.env.FORUM_EMAIL || 'your_email@example.com';
    const PASSWORD = process.env.FORUM_PASSWORD || 'your_password';
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://fuoverflow.com/login/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('input[name="login"]', { timeout: 15000 });
    await page.type('input[name="login"]', EMAIL); 
    await page.type('input[name="password"]', PASSWORD); 
    await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60000 }),
        page.keyboard.press('Enter')
    ]);

    await page.goto('https://fuoverflow.com/threads/ite302c-sp26-fe.6496/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Click the first image to open lightbox
    await page.evaluate(() => {
        const firstImage = document.querySelector('a.lbContainer, a[data-lb-id], .attachment-icon a');
        if (firstImage) firstImage.click();
    });
    
    // Wait for lightbox to appear
    await new Promise(r => setTimeout(r, 4000));
    
    // Find download button
    const html = await page.content();
    fs.writeFileSync('lightbox.html', html);
    
    await browser.close();
})();
