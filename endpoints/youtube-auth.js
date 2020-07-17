const {google} = require("googleapis");
const OAuth2 = google.auth.OAuth2;
var youtube_client_id = process.env.YOUTUBE_CLIENT_ID;
var youtube_redirect_uri = process.env.YOUTUBE_REDIRECT_URI;
var youtube_client_secret = process.env.YOUTUBE_CLIENT_SECRET;
var oauth2Client = new OAuth2(youtube_client_id,youtube_client_secret,youtube_redirect_uri);
var spotify_params;
module.exports = {//TODO this probably breaks if multiple people are using it at the same time since there is only one oauth2 client for the whole server
    oauth2Client: oauth2Client,
    login: function (req, res) {
        spotify_params=req.query.spotify_params;
        res.redirect(oauth2Client.generateAuthUrl({ scope: "https://www.googleapis.com/auth/youtube.force-ssl" }));
    },
    callback: async (req, res) => {
        const token = await oauth2Client.getToken(req.query.code);
        oauth2Client.setCredentials(token);
        res.cookie("youtube-auth",true,{expires:new Date(token.expiry_date)}).redirect("http://localhost:3000");
    }
}