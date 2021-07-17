export default async (req, res) => {
    const data = {
        client_id:process.env.SPOTIFY_CLIENT_ID,
        client_secret:process.env.SPOTIFY_CLIENT_SECRET,
        grant_type:"authorization_code",
        code:req.query.code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI
    }
    const options = {
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        body:new URLSearchParams(data).toString()
    }
    const oauthres = await fetch("https://accounts.spotify.com/api/token",options).then((res)=>res.json());
    let base="";
    if(process.env.NODE_ENV==="development")
        base="http://localhost:3000";
    else
        base=`${req.protocol}://${req.hostname}`;
    res.cookie("spotify_access_token",oauthres.access_token,{maxAge:oauthres.expires_in*1000}).redirect(base);
}