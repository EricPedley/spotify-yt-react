import React from "react"
export default function SpotifyHalf() {

    function showImportScreen() {
        console.log("show import screen");
    }
    return (
        <div className="col-md-6 half" id="spotify-half">
            <a href="/spotify-login" id="spotify-login" className="big-link spotify-colors">
                <h3>Log in with Spotify</h3>
            </a>
            <div id="spotify-loggedin"></div>
            <br></br>
            <br></br>
            <button id="import-button" onClick={showImportScreen} className="pressable big-link">
                <h3>Or Import Tracks From JSON</h3>
            </button>
            <div id="import-holder"></div>
        </div>
    );
}