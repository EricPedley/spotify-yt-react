import React,{useState} from 'react';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import SpotifyHalf from "./spotify/SpotifyHalf";
import YoutubeHalf from "./youtube/YoutubeHalf";
import PlaylistContext from "./PlaylistContext";

export default function App() {
  const [state, setState] = useState()
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
          <div className="col-md-6" style={{ backgroundColor: "#1ed760", height: "10px" }}></div>
          <div className="col-md-6" style={{ backgroundColor: "#FF0000", height: "10px" }}></div>
        </div>
        <div id="popup"></div>
      </div>
      <Footer />
    </>
  );
}

