const base = require("../baseURL");
export default (req, res) => {
    const scope = "https://www.googleapis.com/auth/youtube.force-ssl"//TODO change scope to use incremental auth: https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps#incrementalAuth
    const params = {
        client_id: process.env.YOUTUBE_CLIENT_ID,
        redirect_uri: `${base}/api/youtube/callback`,
        response_type: "code",
        scope: scope
    };
    res.redirect("https://accounts.google.com/o/oauth2/v2/auth?"+new URLSearchParams(params).toString());
}