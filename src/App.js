import React from 'react';
import './App.css';

function App() {
  return (
    <>
      <div className="header">
        <div className="container">
            <div className="row">
                <div className="col-3"><img id="logo" alt = "logo" src="images/icon.png"></img></div>
                <div className="col-9">
                    <h1>Spotify To Youtube Playlist Converter</h1>
                    <div id='instructions'>Log in with Spotify first</div>
                </div>
            </div>

        </div>
    </div>
    <div className="container-fluid">
        <div className="row align-items-center" id="main">
            <div className="col-md-6 half" id="spotify-half">
                <a href="/spotify-login" id="spotify-login" className="big-link spotify-colors">
                    <h3>Log in with Spotify</h3>
                </a>
                <div id="spotify-loggedin"></div>
                <br></br>
                <br></br>
                <button id ="import-button" className="pressable big-link">
                    <h3>Or Import Tracks From JSON</h3>
                </button>
                <div id="import-holder"></div>
            </div>

            <div className="col-md-6 half" id="youtube-half">
                <a href="/youtube-login" id="youtube-login" className="big-link youtube-colors">
                    <h3>Log in with Youtube</h3>
                </a>
                <div id="youtube-loggedin"></div>
            </div>
        </div>

        <div id="popup"></div>
    </div>
    <div id="bottom-section">
        <div className="container" id="info">

            <h1>Info</h1>
            <br></br>
            <h4>Quota Error Message</h4>
            <p>This website uses the youtube data api to list and add songs to your playlists. Youtube gives each API
                client(this website is one client) a free daily quota of 10,000 units. Each song converted costs 152
                units
                and listing a user's YT playlists costs 1 unit, so the website as a whole can only process roughly 65
                songs
                per day. If the quota is filled you will see an error message and have to wait to transfer your songs.
            </p>
            <h4>How it's made</h4>
            <p>The source code for this website is available on Github at <a id="github-link" className="small-link"
                    href="https://github.com/EricPedley/js-spotify-converter">EricPedley/js-spotify-converter</a>. The
                backend for this project is nodejs and the frontend uses bootstrap css and jquery. This program uses the
                spotify api REST endpoints and youtube data api v3 nodejs client library.</p>
        </div>
    </div>
    </>
  );
}

export default App;
