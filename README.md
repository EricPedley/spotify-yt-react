This project is a website that adds songs from a spotify playlist into a youtube playlist. 
<br>If you want to use it you need to have spotify api and youtube data api accounts and set their credentials as environment variables. 
<br>The environment variables you need to set are as follows: 
<br>SPOTIFY_CLIENT_ID,
<br>SPOTIFY_CLIENT_SECRET,
<br>SPOTIFY_REDIRECT_URI, - the base url + /spotify-callback. ex: http://localhost:8888/spotify-callback
<br>YOUTUBE_CLIENT_ID,
<br>YOUTUBE_CLIENT_SECRET,
<br>YOUTUBE_REDIRECT URI - the base url + /youtube-callback. ex: http://localhost:8888/youtube-callback
<br>The names are pretty much self explanatory if you are familiar with OAuth authentication.
<br>The available npm scripts are start, build and development. development launches the create-react-app server, and start launches the custom backend. The custom backend serves from the build folder, which is created by the build script.
