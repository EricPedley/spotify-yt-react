const fetch = require("node-fetch")
const protocol = require("../protocol")
export default async (req, res) => {
    const data = {
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: req.query.code,
        redirect_uri: `${protocol}://${process.env.VERCEL_URL}/api/spotify/callback`
    }
    const options = {
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        body:new URLSearchParams(data).toString()
    }
    const oauthres = await fetch("https://accounts.spotify.com/api/token",options).then((res)=>res.json());
    const base=`${protocol}://${process.env.VERCEL_URL}`;
    //res.cookie("spotify_access_token",oauthres.access_token,{maxAge:oauthres.expires_in*1000}) //expressjs verison
    res.setHeader("Set-Cookie",`spotify_access_token=${oauthres.access_token}; Max-Age=${oauthres.expires_in}; Path=/`)
    //the above cookie doesn't work if you omit Path=/, because otherwise when you get redirected to / it will be on a different path
    res.redirect(base);
}