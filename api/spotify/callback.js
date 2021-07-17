const callback = require("../oAuthCallback")
const base = require("../baseURL")
export default async (req, res) => {
    const data = {
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
        redirect_uri: `${base}/api/spotify/callback`,
        grant_type: "authorization_code",
        code: req.query.code
    }
    return callback(res,data,"https://accounts.spotify.com/api/token","spotify_access_token");
}