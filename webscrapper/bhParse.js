// const puppeteer = require('puppeteer');
import puppeteer from 'puppeteer';
// const nameList = [
// 	'Martin Luther King Jr.',
// 	'Harriet Tubman',
// 	'Rosa Parks',
// 	'Muhammad Ali',
// 	'Jackie Robinson',
// 	'Langston Hughes',
// 	'Maya Angelou',
// 	'George Washington Carver',
// 	'Barack Obama',
// 	'Madam C.J. Walker',
// 	'Mae C. Jemison',
// 	'Daniel Hale Williams',
// 	'Garret Morgan',
// 	'Oprah Winfrey',
// 	'Carter G. Woodson',
// ];

// export const nameURL = (name) => {
// 			const endpoint = 'https://www.biography.com/activist/';
// 			let nameAlt = name.toLowerCase().replace(/\s/g, '-');
// 			if (nameAlt.includes('.')) {
// 				return endpoint + nameAlt.replace(/\./g, '');
// 			} 
// 			return endpoint + nameAlt;
// 		};
 
    

export const bhParse = async function (nameURL){
    console.log(`nameURL: ${nameURL}`)
    try {
			/* Initiate the Puppeteer browser */
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
            
			// Removes navigation Timeout
			await page.setDefaultNavigationTimeout(0);
			/* Go to the page and wait for it to load */
			await page.goto(nameURL, { waitUntil: 'networkidle0', timeout: 0});

			/* Run javascript inside of the page */
			const data = await page.evaluate(() => {
				const dates = document.querySelector(
					'.m-detail-header--person-occupations'
				).innerHTML;
				const merit = document.querySelector('.m-person--abstract').innerHTML;
				const image = document.querySelector('.m-person--image img').src;
				/* Returning an object filled with the scraped data */
				return {
					dates,
					merit,
					image,
				};
			});

			/* Outputting what we scraped */
			console.log(data);

			// await browser.close();
		} catch (error) {
        console.error(error);
    }
};

// const res = nameURLs.map((nameURL) => bhParse(nameURL));
// console.log(res);

// module.exports = bhParse;