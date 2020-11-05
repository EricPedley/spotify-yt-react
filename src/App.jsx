import React, { useContext } from 'react';
import './App.css';
import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";
import SpotifyHalf from "./Components/SpotifyHalf.jsx";
import YoutubeHalf from "./Components/YoutubeHalf.jsx";
import PlaylistContext, { PlaylistContextProvider } from "./Components/PlaylistContext.jsx";
import { QuotaContextProvider } from "./Components/QuotaContext.jsx";
import ConvertPopup from "./Components/ConvertPopup.jsx";

export default function App() {
  return (
    <>
      <QuotaContextProvider>
        <Header />
        <div className="container-fluid">
          <div className="row align-items-center" id="main">
            <PlaylistContextProvider>
              <SpotifyHalf />
              <YoutubeHalf />
              <ConvertPopupDisplayer></ConvertPopupDisplayer>
            </PlaylistContextProvider>
          </div>
          <div className="row">
            <div className="col-md-6 spotify-colors color-bar"></div>
            <div className="col-md-6 youtube-colors color-bar"></div>
          </div>
        </div>
      </QuotaContextProvider>
      <Footer />
    </>
  );
}

function ConvertPopupDisplayer(props) {
  const { spotifyPlaylist, selectedSpotifyTracks, ytPlaylistID } = useContext(PlaylistContext);
  if (!(spotifyPlaylist && ytPlaylistID))
    return <></>;
  else
    return <ConvertPopup spotifyPlaylist={spotifyPlaylist} ytPlaylistID={ytPlaylistID} selectedSpotifyTracks={selectedSpotifyTracks}></ConvertPopup>
}