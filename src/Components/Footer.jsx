import React from "react";

function Footer() {
    return (
        <div id="bottom-section">
        <div className="container" id="info">

            <h1>Info</h1>
            <br></br>
            <h4>Quota Error Message</h4>
            <p>This website uses the youtube data api to list and add songs to your playlists. Youtube gives each API
                client(this website is one client) a free daily quota of 10,000 units. Each song converted costs 50
                units
                and listing a user's YT playlists costs 1 unit, so the website as a whole can only process a bit less than 200
                songs
                per day. If the quota is all used up you will see an error message and have to wait to transfer your songs.
                Occasionally the project's quota is set to zero automatically by Google. I don't know why this happens, but when it does
                I have to make a new Google Cloud project and update the API keys. If the quota display on the website says it's full, but 
                you're getting an error about the quota, <a style = {{color:"#1ed760"}}href = "https://github.com/EricPedley/spotify-yt-react/issues" >post an issue on the github repo</a> and I'll look into fixing it.
            </p>
            <h4>How it's made</h4>
            <p>The source code for this website is available on Github at <a className="small-link white-background"
                    href="https://github.com/EricPedley/spotify-yt-react/">EricPedley/js-spotify-converter</a>. The
                project is built on the MERN stack. It uses the
                spotify api to get your playlists and the tracks in them, then uses pupeteerjs, which is a headless browser, to look up each song on youtube and get its id,
                then uses the youtube data api to add it to your youtube playlist. The headless browser roughly triples the amount of songs this website can 
                convert daily since a search on the api costs 100 units.</p>
        </div>
    </div>
    );
}

export default Footer;
