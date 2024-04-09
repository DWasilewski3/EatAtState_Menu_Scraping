# EatAtState_Menu_Scraping
Scrapes the EatAtState.msu.edu websites to find your favorite foods

# Web Scraping with Puppeteer

This project uses Puppeteer, a Node.js library, to scrape dining hall menus from multiple websites and check for the availability of specified meals.

## Requirements

- Node.js
- Puppeteer

## Installation

1. Install Node.js from the official website.
2. Install Puppeteer with npm:

```bash
npm i puppeteer
```

## How to use

- Locally clone this repository
- Complete the installation requirements
- Add your favorite meals or the meal you want to search for to ```data.js```
- Run the the full menu search or single meal search using ```node mune-fetch.js``` or ```node search-meal.js```
- (Optional) Run ```node all-meals.js``` to add all meals from all dining halls in the next week to the ```all-meals.txt``` file