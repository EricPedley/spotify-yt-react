import React, { useState } from "react";
import path from "./serverURL"

function Header() {
    const [instructions,] = useState("Log in to select playlists");
    const [units,setUnits] = useState();
    fetch(`${path}quota-count`).then(res=>res.json()).then(setUnits);
    return (
        <div className="header">
            <div className="container">
                <div className="row">
                    <div className="col-3"><img id="logo" alt="logo" src="images/icon.png"></img></div>
                    <div className="col-9">
                        <h1>Spotify To Youtube Playlist Converter</h1>
                        <div id='instructions'>{instructions}</div>
                        <div>Quota Total: {units}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Header;