// describe('Google', () => {
//     beforeAll(async () => {
//         await page.goto('https://google.com');
//     });

//     it('should display "google" text on page', async () => {
//         await expect(page).toMatch('google');
//     });
// });

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', {
        waitUntil: 'networkidle2',
    });
    await page.pdf({ path: 'hn.pdf', format: 'A4' });

    await browser.close();
})();
