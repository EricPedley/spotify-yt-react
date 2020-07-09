import React, { useState } from "react"

function LoginButtons(props) {
    function showImportScreen() {
        props.setState("importField");
    }
    return (
        <>
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
        </>
    )
}
export default function SpotifyHalf() {
    const [state, setState] = useState("noAuth");
    return (
        <div className="col-md-6 half" id="spotify-half">
            {state === "noAuth" && LoginButtons(state)}
        </div>
    );
}