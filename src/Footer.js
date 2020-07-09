import React from "react";

function Footer() {
    return (
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
    );
}

export default Footer;