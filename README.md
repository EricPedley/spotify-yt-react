# Spotify to YouTube Playlist Converter
![project screenshot](https://user-images.githubusercontent.com/48658337/125008966-7a434d00-e018-11eb-91a2-2d8c621cd96c.jpg)
[Demo Link](https://spotify-yt-converter.vercel.app/)
## Description:
  This project is a website that adds songs from a Spotify playlist into a YouTube playlist. The frontend is made with React and the backend is NodeJS with Express. It uses the Spotify API to get a user's playlists and uses PuppeteerJS on the server to search for the corresponding YouTube videos, and then uses the YouTube API to add them to a playlist. It uses MongoDB to store usage data for how much API quota is remaining.
  
### Instructions:
If you want to use it you need to have spotify api and youtube data api accounts and set their credentials as environment variables. 
<br>The environment variables you need to set are as follows: 
<br>SPOTIFY_CLIENT_ID,
<br>SPOTIFY_CLIENT_SECRET,
<br>SPOTIFY_REDIRECT_URI, - the base url + /spotify-callback. ex: http://localhost:8888/spotify-callback
<br>YOUTUBE_CLIENT_ID,
<br>YOUTUBE_CLIENT_SECRET,
<br>YOUTUBE_REDIRECT URI - the base url + /youtube-callback. ex: http://localhost:8888/youtube-callback
<br>The names are pretty much self explanatory if you are familiar with OAuth authentication.
<br>The available npm scripts are start, build and development. development launches the create-react-app server, and start launches the custom backend. The custom backend serves from the build folder, which is created by the build script.
