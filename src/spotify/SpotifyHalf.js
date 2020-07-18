import React, { useState, useContext, useEffect } from "react";
import PlaylistContext from "../PlaylistContext";

async function getPlaylists(access_token) {
    const options = {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    };
    let user = await fetch("https://api.spotify.com/v1/me", options).then(res => res.json()).catch((err) => { console.log(err) });
    let playlists = await pagerReq(`https://api.spotify.com/v1/users/${user.id}/playlists`, options);
    let returnval = { playlists: playlists, userName: user.display_name }
    return returnval;
}


async function pagerReq(url, options, items = []) {//makes a request to an endpoint where we expect a pager object to be returned, which lists pages of items and a url to fetch the next page
    const res = await fetch(url, options);
    const json = await res.json();
    items = items.concat(json.items);
    if (json.next) {
        return pagerReq(json.next, options, items);
    } else {
        console.log(items);
        return items;
    }
}

export default function SpotifyHalf() {
    let spotify_access_token = document.cookie.split("; ").find((row) => row.startsWith("spotify_access_token"));
    const [state, setState] = useState(spotify_access_token ? "playlistList" : "noAuth");
    return (
        <div className="col-md-6 half left-half">
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
    const [context, setContext] = useContext(PlaylistContext);
    useEffect(() => {
        let spotify_access_token = document.cookie.split("; ").find((row) => row.startsWith("spotify_access_token"));
        if (spotify_access_token) {
            spotify_access_token = spotify_access_token.substring(21);
            if (state.userName === "loading")
                getPlaylists(spotify_access_token).then(({ userName, playlists }) => { setState({ userName: userName, playlists: playlists }) });
        }
    });
    function selectPlaylist(id, name) {
        let spotify_access_token = document.cookie.split("; ").find((row) => row.startsWith("spotify_access_token"));
        const options = {
            headers: {
                'Authorization': 'Bearer ' + spotify_access_token.substring(21)
            }
        }
        pagerReq(`https://api.spotify.com/v1/playlists/${id}/tracks`, options).then((items) => {
            setContext({
                ...context,
                playlist: {
                    name: name,
                    tracks: items.map((item) => item.track)
                }
            });
            props.setParentState("playlist");
        });
    }
    return (

        <div className="left-align">
            {!state.playlists && <h2>Loading...</h2>}
            {state.playlists && <><h2>Logged in as {state.userName}</h2>
                {state.playlists.map((playlist) => (
                    <button key={playlist.id} className={"pressable small-link playlist-button no-background" + (playlist.id === state ? "-selected" : "")} onClick={() => { selectPlaylist(playlist.id, playlist.name) }}>{playlist.name}</button>
                ))}</>}
        </div>
    )
}

function Playlist(props) {
    const [context, setContext] = useContext(PlaylistContext);
    const playlist = context.playlist;
    function goBack() {
        setContext({ ...context, playlist: null });
        props.setParentState("playlistList");
    }
    return (
        <div className="left-align">
            <div>
                <h2 className="large-text">{`Tracks in ${playlist.name}`}</h2>
                <button className="pressable small-link logout-button" onClick={goBack}>Back</button>
            </div>
            {playlist.tracks.map((track, index) => <div key={index}>{track.name}</div>)}
        </div>
    )
}
