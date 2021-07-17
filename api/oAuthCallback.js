const fetch = require("node-fetch")
const protocol = require("./protocol")
module.exports = async (res,data,apiURL,tokenName) => {
    const options = {
        method: "POST",
        headers: {"Content-Type":"application/x-www-form-urlencoded"},
        body: new URLSearchParams(data).toString()
    }
    const oauthres = await fetch(apiURL,options).then((res)=>res.json());
    console.log(oauthres);
    const base=`${protocol}://${process.env.VERCEL_URL}`;
    //res.cookie("spotify_access_token",oauthres.access_token,{maxAge:oauthres.expires_in*1000}) //expressjs verison
    res.setHeader("Set-Cookie",`${tokenName}=${oauthres.access_token}; Max-Age=${oauthres.expires_in}; Path=/`)
    //the above cookie doesn't work if you omit Path=/, because otherwise when you get redirected to / it will be on a different path
    res.redirect(base);
}