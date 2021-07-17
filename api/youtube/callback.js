const callback = require("../oAuthCallback");
const protocol = require("../protocol");
export default async (req, res) => {
    const data = {
        client_id: process.env.YOUTUBE_CLIENT_ID,
        client_secret: process.env.YOUTUBE_CLIENT_SECRET,
        redirect_uri: `${protocol}://${process.env.VERCEL_URL}/api/youtube/callback`,
        grant_type: "authorization_code",
        code: req.query.code
    };
    return callback(res,data,"https://oauth2.googleapis.com/token","youtube_access_token");
}