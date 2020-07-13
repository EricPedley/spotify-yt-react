import React, { useState, useContext } from "react";
import PlaylistContext from "../PlaylistContext";

async function getPlaylists(access_token) {
    let options = {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    let user = await fetch("https://api.spotify.com/v1/me",options).then(res=>res.json()).catch((err)=>{console.log(err)});
    let playlists = await fetch( `https://api.spotify.com/v1/users/${user.id}/playlists`,options).then(res=>res.json()).catch((err)=>{console.log(err)});
    let returnval = {playlists:playlists.items,userName:user.display_name}
    console.log(returnval);
    return user;
}

export default function SpotifyHalf() {
    let spotify_access_token = document.cookie.split(";").find((row) => row.startsWith("spotify_access_token"));
    let spotify_authenticated = false;
    if (spotify_access_token) {
        spotify_access_token = spotify_access_token.substring(21);
        spotify_authenticated = true;
    }
    console.log(spotify_access_token);
    const pres = getPlaylists(spotify_access_token);
    console.log(pres);
    const {playlists,userName} = pres;
    const [state, setState] = useState(spotify_authenticated?"playlistList":"noAuth");
    return (
        <div className="col-md-6 half" id="spotify-half">
            {state === "noAuth" && <LoginButtons setParentState={setState} />}
            {state === "ImportControls" && <ImportControls setParentState={setState} />}
            {state === "playlistList" && <PlaylistList userName = {userName||"no username"} playlists={playlists||[{ name: "track one", id: 1 }, { name: "track two", id: 2 }, { name: "track three", id: 3 }]} setParentState={setState} />}
            {state === "Playlist" && <Playlist setParentState={setState} />}
        </div>
    );
}

function LoginButtons(props) {
    function showImportScreen() {
        props.setParentState("ImportControls");
    }
    return (
        <>
            <a href="http://localhost:8888/spotify-login" id="spotify-login" className="big-link spotify-colors">
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
            <h1>Logged in as {props.userName}</h1>
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
            {playlist.map((track) => <h4>{track}</h4>)}
        </>
    )
}