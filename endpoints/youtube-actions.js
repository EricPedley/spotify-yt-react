const { google } = require("googleapis");
const youtubeAuth = require("./youtube-auth");
const youtube = google.youtube({
    version: 'v3',
    auth: youtubeAuth.oauth2Client
});
module.exports = {
    listPlaylists: function (req, res) {
        console.log("getting request for youtube playlists");
        youtube.playlists.list({ part: "snippet", mine: true }).then(function (ytres) {
            res.send(ytres.data);
        }).catch(function (err) {
            if (err.message.includes('quota'))
                res.send("quota error")
            else {
                res.send(err.message);
            }
        });
    },
    searchAdd: function (req, res) {
        console.log("searchAdd being run");
        youtube.search.list({
            "part": "snippet",
            "maxResults": 1,
            "type": "video",
            "q": req.query.term
        }).then(function (searchres) {
            youtube.playlistItems.insert({
                "part": [
                    "snippet"
                ],
                "resource": {
                    "snippet": {
                        "playlistId": req.query.id,
                        "resourceId": {
                            "kind": "youtube#video",
                            "videoId": searchres.data.items[0].id.videoId
                        }
                    }
                }
            }).then(function (insertres) {
                console.log("searchAdd success");
                res.send(insertres.data.snippet.title);
            }).catch(function (err) {
                if (("" + err).includes('quotaExceeded'))
                    res.send("quotaExceeded")
            });
        }).catch(function (err) {
            if (("" + err).includes('quotaExceeded'))
                res.send("quotaExceeded")
        });
    }
}