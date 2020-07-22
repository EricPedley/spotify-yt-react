const puppeteer = require("puppeteer");
let browser;
(async ()=>{
    browser = await puppeteer.launch();
    console.log("browser launching");
})();

module.exports = {
    search: async (req,res)=>{
        const id = await search(req.query.term);
        console.log(id);
        res.send({id:id});
    }
}


const search = async (query) => {
    const page = await browser.newPage();
    await page.goto(`https://www.youtube.com/results?search_query=${new URLSearchParams(query).toString()}`);
    const bruh = await page.$eval("#video-title", (element) => element.href);
    await page.close();
    return bruh.substring(bruh.indexOf("?v=")+3);
}