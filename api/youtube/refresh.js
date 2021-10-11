const fetch = require('node-fetch');
const youtube_api_key = process.env.YOUTUBE_API_KEY;
export default async (req,res )=> {
    console.log("refreshing youtube api")
    const ytres = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=qo3ewdnBDnA&maxResults=1&key=${youtube_api_key}`).then(res=>res.json());
    let statusCode = 200;
    if(ytres.error) {
        console.log("error:",ytres,youtube_api_key)
        statusCode=500;
    }
    res.status(statusCode).send(ytres);
}