import React, { useState, useEffect } from "react"
export default function YoutubeHalf() {
    console.log(document.cookie);
    let youtube_auth = document.cookie.split("; ").find((row) => row.startsWith("youtube-auth"));
    return (
        <div className="col-md-6 half" id="youtube-half">
            {!youtube_auth && <LoginButton />}
            {youtube_auth && <PlaylistSelect />}
        </div>
    );
}

function LoginButton() {
    return (
            <a href="http://localhost:8888/youtube-login" id="youtube-login" className="big-link youtube-colors">
                <h3>Log in with Youtube</h3>
            </a>
    );
}

function PlaylistSelect() {
    const [state,setState] = useState("");
    useEffect(()=>{
        fetch("http://localhost:8888").then(()=>{

        });
    });
    return (
        <h1>Loading</h1>
    );
}