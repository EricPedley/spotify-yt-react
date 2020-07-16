import React, { useState, useContext, useEffect } from "react";
import PlaylistContext from "../PlaylistContext";

async function getPlaylists(access_token) {
    const options = {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    }
    let user = await fetch("https://api.spotify.com/v1/me", options).then(res => { if (!res.ok) return res.json() }).catch((err) => { console.log(err) });
    let playlists = await pagerReq(`https://api.spotify.com/v1/users/${user.id}/playlists`, options);
    let returnval = { playlists: playlists, userName: user.display_name }
    console.log(returnval);
    return returnval;
}

export default function SpotifyHalf() {
    const [state, setState] = useState("noAuth");
    let spotify_access_token = document.cookie.split(";").find((row) => row.startsWith("spotify_access_token"));
    if (spotify_access_token)
        setState("playlistList");

    return (
        <div className="col-md-6 half" id="spotify-half">
            {state === "noAuth" && <LoginButtons setParentState={setState} />}
            {state === "ImportControls" && <ImportControls setParentState={setState} />}
            {state === "playlistList" && <PlaylistList setParentState={setState} />}
            {state === "playlist" && <Playlist setParentState={setState} />}
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
    const [, setPlaylist] = useContext(PlaylistContext);
    function submitJSON() {
        console.log(state);
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
    const [state, setState] = useState({ userName: "loading", playlists: [{ name: "loading", id: -1 }] });
    const [, setPlaylist] = useContext(PlaylistContext);
    useEffect(() => {
        let spotify_access_token = document.cookie.split(";").find((row) => row.startsWith("spotify_access_token"));
        if (spotify_access_token) {
            spotify_access_token = spotify_access_token.substring(21);
            if (state.userName === "loading")
                getPlaylists(spotify_access_token).then(({ userName, playlists }) => { setState({ userName: userName, playlists: playlists }) });
        }
    });
    function selectPlaylist(id) {
        let spotify_access_token = document.cookie.split(";").find((row) => row.startsWith("spotify_access_token"));
        props.setParentState("playlist");
        const options = {
            headers: {
                'Authorization': 'Bearer ' + spotify_access_token.substring(21)
            }
        }
        pagerReq([], `https://api.spotify.com/v1/playlists/${id}/tracks`, options).then((items) => { console.log(items) });
        setPlaylist(["demo track one", "track two"]);
    }
    return (
        <div className="playlist-list">
            <h2>Logged in as {state.userName}</h2>
            {state.playlists.map((playlist) => (
                <button key={playlist.id} className={"pressable small-link playlist-button no-background" + (playlist.id === state ? "-selected" : "")} onClick={() => { selectPlaylist(playlist.id) }}>{playlist.name}</button>
            ))}
        </div>
    )
}

function Playlist() {
    const [playlist,] = useContext(PlaylistContext);
    return (
        <>
            <h2>{playlist.name || "Tracks to convert:"}</h2>
            {playlist.map((track, index) => <h4 key={index}>{track}</h4>)}
        </>
    )
}

function pagerReq(items, url, options) {//makes a request to an endpoint where we expect a pager object to be returned, which lists 100 items and the url to fetch the next 100.
    return fetch(url, options).then(res => res.json()).then((json) => {
        items = items.concat(json.items);
        if (json.next) {
            pagerReq(items, json.next, options);
        } else {
            return items;
        }
    }).catch((err) => { console.error(err); });
}