export default async (req, res) => {
    const options = {
        method:"POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:new URLSearchParams({
            code: req.query.code,
            client_id: process.env.YOUTUBE_CLIENT_ID,
            client_secret: process.env.YOUTUBE_CLIENT_SECRET,
            redirect_uri: process.env.REACT_APP_VERCEL_URL,
            grant_type: "authorization_code"
        }).toString()
    }
    const oauthres = await fetch("https://oauth2.googleapis.com/token",options).then(res=>res.json());
    let base="";
    if(process.env.NODE_ENV==="development")
        base="http://localhost:3000";
    else
        base=`${req.protocol}://${req.hostname}`;
    res.cookie("youtube_access_token",oauthres.access_token,{maxAge:oauthres.expires_in*1000}).redirect(base);
}