import React from 'react';
import './App.css';
import Header from "./Header";
import Footer from "./Footer";
import SpotifyHalf from "./spotify/SpotifyHalf";
import YoutubeHalf from"./youtube/YoutubeHalf";

function App() {
  return (
    <>
     <Header/>
    <div className="container-fluid">
        <div className="row align-items-center" id="main">
            <SpotifyHalf/>
            <YoutubeHalf/>
        </div>
        <div id="popup"></div>
    </div>
    <Footer/>
    </>
  );
}

export default App;
