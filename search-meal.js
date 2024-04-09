//Import requirements
const {searchMeal, baseUrls } = require('./data.js');
const puppeteer = require('puppeteer');

async function scrapeWebsiteForFutureMeal(searchMeal = '') {
    if (searchMeal === '') return;

    const browser = await puppeteer.launch();
    
    let today = new Date();
    let found = false;

    for (let i = 0; i < 7; i++) {
        // Format the date as 'yyyy-mm-dd'
        let date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        for (let baseUrl of baseUrls) {
            const page = await browser.newPage();
            await page.goto(`${baseUrl}${date}`);

            // Get the name of the dining hall
            const diningHall = await page.$eval('.rhs-block-content h1', h1 => h1.innerText);

            // Get all elements with the class 'meal-title breakfast'
            let breakfastItems = await page.$$eval('.meal-title.breakfast', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

            // Get all elements with the class 'meal-title lunch'
            let lunchItems = await page.$$eval('.meal-title.lunch', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

            // Get all elements with the class 'meal-title dinner'
            let dinnerItems = await page.$$eval('.meal-title.dinner', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

            // Check if the search meal exists in the breakfast, lunch, or dinner items
            if (breakfastItems.some(item => item.includes(searchMeal))) {
                console.log(`${searchMeal} is available for breakfast at ${diningHall} on ${date}.`);
                found = true;
            }
            if (lunchItems.some(item => item.includes(searchMeal))) {
                console.log(`${searchMeal} is available for lunch at ${diningHall} on ${date}.`);
                found = true;
            }
            if (dinnerItems.some(item => item.includes(searchMeal))) {
                console.log(`${searchMeal} is available for dinner at ${diningHall} on ${date}.`);
                found = true;
            }

            await page.close();
        }

        // Increment the date by one day
        today.setDate(today.getDate() + 1);
    }

    //Print error if the meal is not fount
    if (!found) console.log(`${searchMeal} is not available at any dining hall within the next 7 days.`);

    await browser.close();
}

//Run the funciton
scrapeWebsiteForFutureMeal(searchMeal); 