//Import requirements
const {favoriteMeals, baseUrls } = require('./data.js');
const puppeteer = require('puppeteer');

async function scrapeWebsiteForSingleDay(meals = []) {
    if (meals.length === 0) return;
    const browser = await puppeteer.launch();
    
    // Get today's date in the format 'yyyy-mm-dd'
    const today = new Date();
    const date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    for (let baseUrl of baseUrls) {
        const page = await browser.newPage();
        await page.goto(`${baseUrl}${date}`);

        // Get all elements with the class 'meal-title breakfast'
        let breakfastItems = await page.$$eval('.meal-title.breakfast', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

        // Get all elements with the class 'meal-title lunch'
        let lunchItems = await page.$$eval('.meal-title.lunch', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

        // Get all elements with the class 'meal-title dinner'
        let dinnerItems = await page.$$eval('.meal-title.dinner', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

        // Check if any of the meals exists in the breakfast, lunch, or dinner items
        for (let meal of meals) {
            if (breakfastItems.some(item => item.includes(meal))) {
                const diningHall = await page.$eval('.rhs-block-content h1', h1 => h1.innerText);
                console.log(`${meal} is available for breakfast at ${diningHall} today.`);
            }
            if (lunchItems.some(item => item.includes(meal))) {
                const diningHall = await page.$eval('.rhs-block-content h1', h1 => h1.innerText);
                console.log(`${meal} is available for lunch at ${diningHall} today.`);
            }
            if (dinnerItems.some(item => item.includes(meal))) {
                const diningHall = await page.$eval('.rhs-block-content h1', h1 => h1.innerText);
                console.log(`${meal} is available for dinner at ${diningHall} today.`);
            }
        }

        await page.close();
    }

    await browser.close();
}

//Run the function
scrapeWebsiteForSingleDay(favoriteMeals);
