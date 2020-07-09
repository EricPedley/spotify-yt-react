import React from "react"
export default function YoutubeHalf() {

    return (
        <div className="col-md-6 half" id="youtube-half">
                <a href="/youtube-login" id="youtube-login" className="big-link youtube-colors">
                    <h3>Log in with Youtube</h3>
                </a>
                <div id="youtube-loggedin"></div>
            </div>
    );
}