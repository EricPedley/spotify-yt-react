import React, { useState } from "react"

const playlistContext = React.createContext([]);
export default function SpotifyHalf() {
    const [state, setState] = useState("noAuth");
    return (
        <div className="col-md-6 half" id="spotify-half">
            {state === "noAuth" && <LoginButtons setParentState={setState} />}
            {state === "importField" && <ImportField setParentState={setState} />}
            {state === "playlistList" && <PlaylistList playlists={[{ name: "track one", id: 1 }, { name: "track two", id: 2 }, { name: "track three", id: 3 }]} setParentState={setState} />}
        </div>
    );
}

function LoginButtons(props) {
    function showImportScreen() {
        props.setParentState("importField");
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
function ImportField(props) {
    function submitJSON() {
        props.setParentState("playlistList");
    }
    return (
        <>
            <h3>Enter JSON Text Here:</h3>
            <code><textarea wrap="soft" id="spotify-import"></textarea></code>
            <button class="pressable small-link" id="import-submit" onClick={submitJSON}><h4>Import Playlist</h4></button>
        </>
    )
}
function PlaylistList(props) {
    const [state, setState] = useState("");
    function selectPlaylist(id) {
        setState(id);
    }
    return (
        <div id="playlist-list">
            <h2 style={{ paddingLeft: "6px" }}>{state===""?"Select a Playlist":`Playlist Selected: ${props.playlists.find((playlist)=>(state===playlist.id)).name}`}</h2>
            {props.playlists.map((playlist) => (<>
                <button class={"pressable small-link playlist-button" + (playlist.id === state ? "-selected" : "")} onClick={() => { selectPlaylist(playlist.id) }}>{playlist.name}</button>
                <br></br>
            </>))}
        </div>
    )
}

function PlaylistView()