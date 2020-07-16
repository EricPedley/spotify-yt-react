const querystring = require('querystring');
const fetch = require('node-fetch');
const spotify_client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_redirect_uri = process.env.SPOTIFY_REDIRECT_URI; // Your redirect uri
module.exports = {
    login: (req, res) => {
        const scope = 'playlist-read-private';
        res.redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: spotify_client_id,
                scope: scope,
                redirect_uri: spotify_redirect_uri
            }));
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
            body:querystring.stringify(data)
        }
        const oauthres = await fetch("https://accounts.spotify.com/api/token",options).then((res)=>res.json());
        console.log(oauthres);
        res.cookie("spotify_access_token",oauthres.access_token,{expire: 360000 + Date.now()}).redirect("http://localhost:3000");
    }
}