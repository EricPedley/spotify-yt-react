import React,{useState} from 'react';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import SpotifyHalf from "./spotify/SpotifyHalf";
import YoutubeHalf from "./youtube/YoutubeHalf";
import PlaylistContext from "./PlaylistContext";

export default function App() {
  const [state, setState] = useState({tryDisplayConvert});
  function tryDisplayConvert() {//checks if both playlists are selected and if so, displays the convert button
    if(state.ytID&&state.playlist) {
      console.log("ready to convert")
    }
  }
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row align-items-center" id="main">
          <PlaylistContext.Provider value = {[state,setState]}>
            <SpotifyHalf />
            <YoutubeHalf />
          </PlaylistContext.Provider>
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

