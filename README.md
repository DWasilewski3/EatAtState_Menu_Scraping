# EatAtState_Menu_Scraping
Scrapes the EatAtState.msu.edu websites to find your favorite foods

# Web Scraping with Puppeteer

This project uses Puppeteer, a Node.js library, to scrape dining hall menus from official Michigan State University Dining Hall websites and check for the availability of specified meals.

## Requirements

- Node.js
- Puppeteer

## Installation

1. Install Node.js from the [official website](https://nodejs.org/en/download/).
2. Install Puppeteer with npm in your terminal:

```bash
npm i puppeteer
```

## How to use

- Locally clone this repository
- Complete the installation requirements
- Add your favorite meals or the meal you want to search for to ```data.js```
- In the terminal, run the command ```node search-full-week.js``` to search for when and where your favorite meals will be served this week.
- OR Run the the full menu search or single meal search using ```node search-today.js``` or ```node search-single-meal.js```
- (Optional) Run ```node all-meals.js``` to add all meals from all dining halls in the next week to the ```all-meals.txt``` file