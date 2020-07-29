const fetch = require('node-fetch');
const youtube_client_id = process.env.YOUTUBE_CLIENT_ID;
const youtube_redirect_uri = process.env.YOUTUBE_REDIRECT_URI;
const youtube_client_secret = process.env.YOUTUBE_CLIENT_SECRET;
module.exports = {
    login: function (req, res) {
        const params = {
            client_id:youtube_client_id,
            redirect_uri:youtube_redirect_uri,
            response_type:"code",
            scope:"https://www.googleapis.com/auth/youtube.force-ssl"
        };
        res.redirect("https://accounts.google.com/o/oauth2/v2/auth?"+new URLSearchParams(params).toString());
        //res.redirect(oauth2Client.generateAuthUrl({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" }));
    },
    callback: async (req, res) => {
        const options = {
            method:"POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body:new URLSearchParams({
                code: req.query.code,
                client_id: youtube_client_id,
                client_secret: youtube_client_secret,
                redirect_uri: youtube_redirect_uri,
                grant_type: "authorization_code"
            }).toString()
        }
        const oauthres = await fetch("https://oauth2.googleapis.com/token",options).then(res=>res.json());
        let base="";
        if(process.env.NODE_ENV==="development")
            base="http://localhost:8888";
        else
            base=`${req.protocol}://${req.hostname}`;
        res.cookie("youtube_access_token",oauthres.access_token,{maxAge:oauthres.expires_in*1000}).redirect(base);
    }
}