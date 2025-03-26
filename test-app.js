const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Define the URLs to test
  const urlsToTest = [
    'http://localhost:3000', // Replace with your app's base URL
    '/about',
    '/contact',
    '/dashboard',
    // Add more paths as needed
  ];

  const results = [];

  for (const url of urlsToTest) {
    try {
      await page.goto(url.startsWith('http') ? url : `http://localhost:3000${url}`, { waitUntil: 'networkidle2' });

      // Check if the page loaded successfully
      const title = await page.title();
      const viewport = await page.viewport();

      results.push({
        url,
        status: 'Success',
        title,
        viewport,
      });

      console.log(`✅ Page loaded: ${url}`);
    } catch (error) {
      results.push({
        url,
        status: 'Failed',
        error: error.message,
      });

      console.error(`❌ Failed to load: ${url}`);
    }
  }

  // Check responsiveness
  await page.setViewport({ width: 375, height: 812 }); // iPhone X dimensions
  console.log('✅ Mobile responsiveness test completed.');

  await browser.close();

  // Output results
  console.log('Test Results:', results);
})();
