import React, { useState } from 'react';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import SpotifyHalf from "./SpotifyHalf";
import YoutubeHalf from "./YoutubeHalf";
import PlaylistContext from "./PlaylistContext";
import ConvertPopup from "./ConvertPopup";

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
      </div>
      <Footer />
    </>
  );
}