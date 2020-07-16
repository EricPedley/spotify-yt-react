import React, { useState, useEffect } from "react"
export default function YoutubeHalf() {
    const [state,setState] = useState({playlists:undefined});
    // console.log(document.cookie);
    // let youtube_auth = document.cookie.split("; ").find((row) => row.startsWith("youtube-auth"));
    useEffect(()=>{
        if(!state.playlists) {
            fetch("http://localhost:8888/youtube-list-playlists").then((res) => res.json()).then((json) => { setState({ playlists: json.items }); console.log(json) });
        }
    });
    

    return (
        <div className="col-md-6 half" id="youtube-half">
            {!state.playlists && <LoginButton />}
            {state.playlists && <PlaylistSelect playlists={state.playlists} />}
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

function PlaylistSelect(props) {
    const [state, setState] = useState("");
    function setSelected(id) {
        setState(id);
    }
    return (
                <div className="playlist-list">
                    <h2>Logged in as {props.playlists[0].snippet.channelTitle}</h2>
                    {props.playlists.map((playlist) => (
                        <button onClick={()=>{setSelected(playlist.id)}} className={`pressable small-link playlist-button ${(state===playlist.id?"youtube-colors":"no-background")}`} key={playlist.id}>{playlist.snippet.title}</button>
                    ))}
                </div>
            
    );
}