const puppeteer = require("puppeteer");
let browser;
(async ()=>{
    browser = await puppeteer.launch();
    console.log("browser launching");
})();
let requests = 0;
module.exports = {
    search: async (req,res)=>{
        console.log(req.query.term);
        console.log(++requests)
        const id = await search(req.query.term);
        console.log(req.query.term+" : "+id);
        res.send({id:id});
    }
}


const search = async (query) => {
    try {
        const page = await browser.newPage();
        await page.goto(`https://www.youtube.com/results?search_query=${new URLSearchParams(query).toString()}`);
        const bruh = await page.$eval("#video-title", (element) => element.href);
        await page.close();
        return bruh.substring(bruh.indexOf("?v=")+3);
    } catch(error) {
        console.log("error for query "+query);
        console.log(error);
        return -1;
    }
    
}