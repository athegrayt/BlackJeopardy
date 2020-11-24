// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
import { bhParse } from './bhParse.js';

const bioURL = 'https://www.biography.com/tag/black-history#:~:text=While%20Black%20History%20Month%20is,profound%20impact%20in%20history%3A%20self%2D';
// const bhParse = require('./bhParse');

(async () => {
	try {
		/* Initiate the Puppeteer browser */
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		
		// Removes navigation Timeout
		await page.setDefaultNavigationTimeout(0);
		/* Go to the IMDB Movie page and wait for it to load */
		await page.goto(bioURL, { waitUntil: 'networkidle0', timeout: 0 });

		/* Run javascript inside of the page */
		let data = await page.evaluate(() => {
			let link = [...document.querySelectorAll('.m-hub-header--description p a')]
			let urls = link.map(item => item.href)
			/* Returning an object filled with the scraped data */
			return urls
		});
		// let bhURLs = await data.map( name => nameURL(name));
		// await browser.close()
		/* Outputting what we scraped */
		let bhData = data.map((bhURL) => bhParse(bhURL))
		
		Promise.all(bhData).then(response => {
			console.log(`response: ${response}`)
		})

		
	} catch (error) {
		console.log(error)
	}
})();

export {puppeteer}