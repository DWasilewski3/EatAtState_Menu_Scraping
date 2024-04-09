const puppeteer = require('puppeteer');
const fs = require('fs');

const { baseUrls } = require('./data.js');

// ***This function does NOT automatically update the allMeals variable***
async function scrapeAllMeals() {
    const browser = await puppeteer.launch();
    
    // Get today's date
    let today = new Date();

    // Create a Set to store all unique meals
    let allMeals = new Set();

    for (let i = 0; i < 7; i++) {
        // Format the date as 'yyyy-mm-dd'
        let date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        for (let baseUrl of baseUrls) {
            const page = await browser.newPage();
            await page.goto(`${baseUrl}${date}`);

            // Now you can scrape the updated content
            let menuItems = await page.$$eval('.menu-item', items => items.map(item => item.innerText.replace(/\n/g, '').split('Contains:')[0].trim()));

            // Add all meals to the Set
            for (let item of menuItems) {
                allMeals.add(item);
            }

            await page.close();
        }

        // Increment the date by one day
        today.setDate(today.getDate() + 1);
    }

    console.log('Writing meals to file...');
    fs.writeFileSync('all-meals.txt', Array.from(allMeals).join(', '));
    console.log('Done!');

    await browser.close();
}

scrapeAllMeals();