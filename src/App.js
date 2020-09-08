import React, { useContext } from 'react';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import SpotifyHalf from "./SpotifyHalf";
import YoutubeHalf from "./YoutubeHalf";
import PlaylistContext, { PlaylistContextProvider } from "./PlaylistContext";
import QuotaContext, { QuotaContextProvider } from "./QuotaContext";
import ConvertPopup from "./ConvertPopup";

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