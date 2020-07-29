if (process.env.NODE_ENV != "production")
  require("dotenv").config();
const express = require('express'); // Express web server framework
const cors = require('cors');
const spotifyAuth = require("./endpoints/spotify-auth");
const youtubeAuth = require("./endpoints/youtube-auth");
const youtubeSearch = require("./endpoints/youtube-search");
var app = express();

app.use(express.static(__dirname + '/build'))
  .use(cors());

app.get('/spotify-login', spotifyAuth.login);
app.get('/spotify-callback', spotifyAuth.callback);

app.get('/youtube-login', youtubeAuth.login);
app.get('/youtube-callback', youtubeAuth.callback);

app.get('/youtube-search', youtubeSearch.search);


let port = process.env.PORT || 8888;
app.listen(port, () => { console.log(`Listening on ${port}`); });







