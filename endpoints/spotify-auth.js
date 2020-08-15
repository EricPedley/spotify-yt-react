const fetch = require('node-fetch');
const spotify_client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri
module.exports = {
    login: (req, res) => {
        const scope = 'playlist-read-private';
        res.redirect('https://accounts.spotify.com/authorize?' +
            new URLSearchParams({
                response_type: 'code',
                client_id: spotify_client_id,
                scope: scope,
                redirect_uri: spotify_redirect_uri
            }).toString());
    },
    callback: async (req, res) => {
        const data = {
            client_id:spotify_client_id,
            client_secret:spotify_client_secret,
            grant_type:"authorization_code",
            code:req.query.code,
            redirect_uri: spotify_redirect_uri
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
}