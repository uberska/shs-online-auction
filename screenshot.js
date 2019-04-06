#!/usr/bin/env node

const puppeteer = require('puppeteer');

(async () => {
	const baseDir = '/git/shs-online-auction/';

	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	await page.goto(`file://${baseDir}overlay.html`);

	const elems = await page.$$('img');

	const boxes = await Promise.all(elems.map(elem => elem.boundingBox()))
	const oldNames = await page.$$eval('img', (imgs, baseDir) => imgs.map(img => img.src.substr(`file://${baseDir}img/`.length)), baseDir);
	const newNames = oldNames.map(name => `final/${name.substr(0, name.length - 4)}_final.png`);

	const screenshotsInfo = boxes.map((box, index) => {
		return {
			clip: box,
			path: newNames[index],
			// omitBackground: true
		};
	})

	for (let index = 0; index < screenshotsInfo.length; index++) {
		console.log(`Processing ${screenshotsInfo[index].path}...`);
		await page.screenshot(screenshotsInfo[index]);
	}

	await browser.close();
})();
