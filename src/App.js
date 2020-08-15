import React, { useContext } from 'react';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import SpotifyHalf from "./SpotifyHalf";
import YoutubeHalf from "./YoutubeHalf";
import PlaylistContext, {PlaylistContextProvider} from "./PlaylistContext";
import ConvertPopup from "./ConvertPopup";

export default function App() {
  const context = useContext(PlaylistContext);
  console.log("app rendering with state", context);
  let readyToConvert = false;
  if (context.ytPlaylistID && context.spotifyPlaylist) {
    readyToConvert = true;
    console.log("ready to convert");
  }
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row align-items-center" id="main">
          <PlaylistContextProvider>
            <SpotifyHalf />
            <YoutubeHalf />
            {readyToConvert && <ConvertPopup></ConvertPopup>}
          </PlaylistContextProvider>
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