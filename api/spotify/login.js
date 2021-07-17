const base = require("../baseURL");
export default (req, res) => {
    const scope = 'playlist-read-private';
    const params = {
        client_id: process.env.SPOTIFY_CLIENT_ID,
        redirect_uri: `${base}/api/spotify/callback`,
        response_type: 'code',
        scope: scope
    }
    res.redirect('https://accounts.spotify.com/authorize?' + new URLSearchParams(params).toString());
}