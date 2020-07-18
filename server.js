if (process.env.NODE_ENV != "production")
  require("dotenv").config();
const express = require('express'); // Express web server framework
const cors = require('cors');
const spotifyAuth = require("./endpoints/spotify-auth");
const youtubeAuth = require("./endpoints/youtube-auth");
var app = express();

app.use(express.static(__dirname + '/public'))
  .use(cors());

app.get('/spotify-login', spotifyAuth.login);
app.get('/spotify-callback', spotifyAuth.callback);

app.get('/youtube-login', youtubeAuth.login);
app.get('/youtube-callback', youtubeAuth.callback);



let port = process.env.PORT || 8888;
app.listen(port,()=>{console.log(`Listening on ${port}`);});







