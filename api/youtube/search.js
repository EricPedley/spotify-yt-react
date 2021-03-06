const playwright = require("playwright-aws-lambda");
//https://public-apis.io/screenshoot-api-with-pupeteer
let requests = 0;
export default async (req, res) => {
    console.log(`starting ${req.query.term} (request #${requests++})`);
    const id = await search(req.query.term);
    console.log(`finished ${req.query.term}, id is ${id}`);
    res.send({ id: id });
}


const search = async (query) => {
    try {
        const browser = await playwright.launchChromium({
            headless:true
        });//TODO: find a way for browser to not launch for every request
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`https://www.youtube.com/results?search_query=${new URLSearchParams(query).toString()}`);
        const bruh = await page.$eval("#video-title", (element) => element.href);
        await page.close();
        await browser.close();
        return bruh.substring(bruh.indexOf("?v=") + 3);
    } catch (error) {
        console.log("error for query " + query);
        console.log(error);
        return -1;
    }

}