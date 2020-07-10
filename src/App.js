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
        <div className="row">
        <div className="col-md-6" style = {{backgroundColor:"#1ed760",height:"10px"}}></div>
        <div className="col-md-6" style = {{backgroundColor:"#FF0000",height:"10px"}}></div>
        </div>
        <div id="popup"></div>
    </div>
    <Footer/>
    </>
  );
}

export default App;
