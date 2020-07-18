import React, { useState } from 'react';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import SpotifyHalf from "./spotify/SpotifyHalf";
import YoutubeHalf from "./youtube/YoutubeHalf";
import PlaylistContext from "./PlaylistContext";

export default function App() {
  const [state, setState] = useState({});
  console.log("app rendering with state", state);
  let readyToConvert = false;
  if (state.ytID && state.playlist) {
    readyToConvert = true;
    console.log("ready to convert");
  }
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row align-items-center" id="main">
          <PlaylistContext.Provider value={[state, setState]}>
            <SpotifyHalf />
            <YoutubeHalf />
          </PlaylistContext.Provider>
          {readyToConvert && <ConvertPopup ytID={state.ytID} playlist={state.playlist}></ConvertPopup>}
        </div>
        <div className="row">
          <div className="col-md-6 spotify-colors color-bar"></div>
          <div className="col-md-6 youtube-colors color-bar"></div>
        </div>
        <div id="popup"></div>
      </div>
      <Footer />
    </>
  );
}

function ConvertPopup(props) {
  return (
    <div id="convert-popup">
      <button className="pressable big-link" id="convert-button" onClick={() => { convert(props) }}><h3>Convert</h3></button>
    </div>
  )
}

async function convert({ playlist: { tracks }, ytID }) {
  let youtube_access_token = document.cookie.split("; ").find((row) => row.startsWith("youtube_access_token"));
  while (tracks.length > 0) {
    const track = tracks.pop();
    const options1 = {
      headers: {
        Authorization: `Bearer ${youtube_access_token.substring(21)}`
      }
    };
    const data = {
      "part": "snippet",
      "maxResults": 1,
      "type": "video",
      "q": track.name + track.artists.reduce(((prev, cur) => prev + " " + cur.name),"")
    };
    const searchres = await fetch("https://www.googleapis.com/youtube/v3/search?"+new URLSearchParams(data), options1).then(res=>res.json());
    console.log(searchres);
    const options2 = {
      headers: {
        Authorization: `Bearer ${youtube_access_token.substring(21)}`
      },
      method:"POST",
      body: JSON.stringify({
        "snippet": {
          "playlistId": ytID,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": searchres.items[0].id.videoId
          }
        }
      })
    }
    const insertres = await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet",options2).then(res=>res.json());
    console.log(insertres);
  }

  console.log(tracks, ytID);
}