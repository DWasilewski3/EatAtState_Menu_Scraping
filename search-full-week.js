const { favoriteMeals, baseUrls } = require('./data.js');
const puppeteer = require('puppeteer');

async function scrapeWebsiteForMealSchedule(meals = []) {
    if (meals.length === 0) return;

    const browser = await puppeteer.launch();

    let today = new Date();
    let found = false;

    for (let day = 0; day < 7; day++) {
        let date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        for (let baseUrl of baseUrls) {
            const page = await browser.newPage();
            await page.goto(`${baseUrl}${date}`);

            const diningHall = await page.$eval('.rhs-block-content h1', h1 => h1.innerText);

            let breakfastItems = await page.$$eval('.meal-title.breakfast', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));
            let lunchItems = await page.$$eval('.meal-title.lunch', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));
            let dinnerItems = await page.$$eval('.meal-title.dinner', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

            for (let meal of meals) {
                if (breakfastItems.some(item => item.includes(meal))) {
                    console.log(`${meal} is available for breakfast at ${diningHall} on ${date}.`);
                    found = true;
                }
                if (lunchItems.some(item => item.includes(meal))) {
                    console.log(`${meal} is available for lunch at ${diningHall} on ${date}.`);
                    found = true;
                }
                if (dinnerItems.some(item => item.includes(meal))) {
                    console.log(`${meal} is available for dinner at ${diningHall} on ${date}.`);
                    found = true;
                }
            }

            await page.close();
        }

        today.setDate(today.getDate() + 1);
    }

    if (!found) console.log(`None of the meals are available at any dining hall within the next 7 days.`);

    await browser.close();
}

// Example usage:
scrapeWebsiteForMealSchedule(favoriteMeals);
