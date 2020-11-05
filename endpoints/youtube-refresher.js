const fetch = require('node-fetch');
const youtube_api_key = process.env.YOUTUBE_API_KEY;
module.exports = {
    refresh: async (req,res )=> {
        console.log("refreshing youtube api")
        const ytres = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=qo3ewdnBDnA&maxResults=1&key=${youtube_api_key}bruh`).then(res=>res.json());
        if(ytres.error)
            res.sendStatus(ytres.error.code)
        else
            res.send(ytres);
    }
}
