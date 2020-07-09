import React, {useState} from "react";

function Header() {
    const [instructions,setInstructions] = useState("Log in to select playlists");
    return (
        <div className="header">
        <div className="container">
            <div className="row">
                <div className="col-3"><img id="logo" alt = "logo" src="images/icon.png"></img></div>
                <div className="col-9">
                    <h1>Spotify To Youtube Playlist Converter</h1>
                    <div id='instructions'>{instructions}</div>
                </div>
            </div>

        </div>
        </div>
    );
}

export default Header;