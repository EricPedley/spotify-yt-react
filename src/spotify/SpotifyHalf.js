import React, {useState, useContext} from "react";
import PlaylistContext from "../PlaylistContext";

export default function SpotifyHalf() {
    const [state, setState] = useState("noAuth");
    return (
        <div className="col-md-6 half" id="spotify-half">
            {state === "noAuth" && <LoginButtons setParentState={setState} />}
            {state === "ImportControls" && <ImportControls setParentState={setState} />}
            {state === "playlistList" && <PlaylistList playlists={[{ name: "track one", id: 1 }, { name: "track two", id: 2 }, { name: "track three", id: 3 }]} setParentState={setState} />}
            {state === "Playlist" && <Playlist setParentState={setState} />}
        </div>
    );
}

function LoginButtons(props) {
    function showImportScreen() {
        props.setParentState("ImportControls");
    }
    function openStuff() {
        window.location="spotify-login";
    }
    return (
        <>
            <a href="/spotify-login" id="spotify-login" onClick={openStuff} className="big-link spotify-colors">
                <h3>Log in with Spotify</h3>
            </a>
            <br></br>
            <br></br>
            <button id="import-button" onClick={showImportScreen} className="pressable big-link">
                <h3>Or Import Tracks From JSON</h3>
            </button>
            <div id="import-holder"></div>
        </>
    )
}

function ImportControls(props) {
    const [state, setState] = useState("");
    const [playlist, setPlaylist] = useContext(PlaylistContext);
    function submitJSON() {
        console.log(state);
        props.setParentState("Playlist");
    }
    return (
        <>
            <h3>Enter JSON Text Here:</h3>
            <form>
                <code><textarea wrap="soft" onChange={(event) => { setState(event.target.value) }} id="spotify-import" value={state}></textarea></code>
                <input type="submit" className="pressable small-link" id="import-submit" onClick={() => { setPlaylist(JSON.parse(state)); submitJSON() }} value="Import Playlist"></input>
            </form>
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
            <h2 style={{ paddingLeft: "6px" }}>{state === "" ? "Select a Playlist" : `Playlist Selected: ${props.playlists.find((playlist) => (state === playlist.id)).name}`}</h2>
            {props.playlists.map((playlist) => (
                <button key={playlist.id} className={"pressable small-link playlist-button" + (playlist.id === state ? "-selected" : "")} onClick={() => { selectPlaylist(playlist.id) }}>{playlist.name}</button>
            ))}
        </div>
    )
}

function Playlist() {
    const [playlist,] = useContext(PlaylistContext);
    return (
            <>
            <h1>Playlist Chosen:</h1>
            {playlist.map((track)=><h4>{track}</h4>)}
            </>
    )
}