const protocol = require("../protocol")
export default (req, res) => {
    const scope = 'playlist-read-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
        new URLSearchParams({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: scope,
            redirect_uri: `${protocol}://${process.env.VERCEL_URL}/api/spotify/callback`
        }).toString());
}