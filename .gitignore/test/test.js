const puppeteer = require('puppeteer');
const fs = require('fs');
const {favoriteMeals, baseUrls } = require('../../data.js');

async function testScrapeWebsiteForSingleDay() {
    const browser = await puppeteer.launch();
    
    // Get today's date in the format 'yyyy-mm-dd'
    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    let allMenuItems = [];

    for (let baseUrl of baseUrls) {
        const page = await browser.newPage();
        await page.goto(`${baseUrl}${date}`);

        // Get all elements with the class 'meal-title breakfast'
        let breakfastItems = await page.$$eval('.meal-title.breakfast', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

        // Get all elements with the class 'meal-title lunch'
        let lunchItems = await page.$$eval('.meal-title.lunch', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

        // Get all elements with the class 'meal-title dinner'
        let dinnerItems = await page.$$eval('.meal-title.dinner', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

        // Add menu items to the array
        allMenuItems.push(`Breakfast items at ${baseUrl}${date}:`);
        allMenuItems.push(...breakfastItems);
        allMenuItems.push(`Lunch items at ${baseUrl}${date}:`);
        allMenuItems.push(...lunchItems);
        allMenuItems.push(`Dinner items at ${baseUrl}${date}:`);
        allMenuItems.push(...dinnerItems);

        await page.close();
    }

    await browser.close();

    // Write all menu items to 'test.txt'
    fs.writeFileSync('test.txt', allMenuItems.join('\n'));
}


testScrapeWebsiteForSingleDay()
