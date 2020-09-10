import React, { useState, useContext, useEffect } from "react";
import path from "./serverURL"
import QuotaContext from "./QuotaContext";

function Header() {
    const { quota, setQuota } = useContext(QuotaContext);
    const [instructions,] = useState("Log in to select playlists");
    useEffect(() => { fetch(`${path}quota-count`).then(res => res.json()).then(setQuota); }, []);
    function getHSLString() {
        const percent = quota / 10000;
        return `hsl(${141 * percent},${76 + 24 * (1 - percent)}%, ${48 + 2 * (1 - percent)}%)`
    }
    return (
        <div className="header" >
            <div className="container">
                <div className="row">
                    <div className="col-3"><img id="logo" alt="logo" src="images/icon.png"></img></div>
                    <div className="col-9">
                        <h1>Spotify To Youtube Playlist Converter</h1>
                        <div id='instructions'>{instructions}</div>
                        <div>Quota Total: {typeof quota =="string" && quota}/10000 Units</div>
                    </div>
                </div>
            </div>
            <div style={{border: "solid gray 2px"}}>
                <div style={{ backgroundColor: getHSLString(), height:"1.5em", width: `${quota / 100}%` }}></div>
            </div>
        </div >
    );
}
export default Header;