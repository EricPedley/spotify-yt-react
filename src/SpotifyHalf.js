import React, { useState, useContext, useEffect } from "react";
import PlaylistContext from "./PlaylistContext";
import path from "./serverURL"

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
    if (spotify_access_token && !spotify_access_token.length > 21)
        spotify_access_token = undefined;
    const [state, setState] = useState(spotify_access_token ? "playlistList" : "noAuth");
    const [playlist, setPlaylist] = useState();
    return (
        <div className="col-md-6 half left-half">
            {state === "noAuth" && <LoginButtons setParentState={setState} />}
            {state === "ImportControls" && <ImportControls setParentState={setState} />}
            {state === "playlistList" && <PlaylistList setParentState={setState} setPlaylist={setPlaylist} />}
            {state === "playlist" && <Playlist setParentState={setState} playlist={playlist} />}
        </div>
    );
}

function LoginButtons(props) {
    let spotify_access_token = document.cookie.split("; ").find((row) => row.startsWith("spotify_access_token"));
    if (spotify_access_token && spotify_access_token.length <= 21) {
        spotify_access_token = false;
    }
    function showImportScreen() {
        props.setParentState("ImportControls");
    }
    function logOut() {
        window.open("https://spotify.com/logout", "_blank", "top=0&,left=0,")
        document.cookie = "spotify_access_token=";
        window.location.reload(false);
    }
    return (
        <div id="login-buttons">
            {spotify_access_token && <>
                <button className="big-link pressable spotify-colors" onClick={() => { props.setParentState("playlistList") }}><h3>Choose a Spotify Playlist</h3></button>
                <br></br>
                <br></br>
                <button className="big-link pressable spotify-colors" onClick={logOut}><h3>Log Out</h3></button>
            </>}
            {!spotify_access_token && <a href={`${path}spotify-login`} className="big-link spotify-colors">
                <h3>Log in with Spotify</h3>
            </a>}
            <br></br>
            <br></br>
            <button id="import-button" onClick={showImportScreen} className="pressable big-link">
                <h3>Or Import Tracks From JSON</h3>
            </button>
            <div id="import-holder"></div>
        </div>
    )
}

function ImportControls(props) {
    const [state, setState] = useState("");
    const [context, setContext] = useContext(PlaylistContext);
    return (
        <>
            <div>
                <h2 className="large-text">Enter JSON Text Here:</h2>
                <button className="pressable small-link logout-button" onClick={goBack}>Back</button>
            </div>
            <form>
                <code><textarea wrap="soft" onChange={(event) => { setState(event.target.value) }} id="spotify-import" value={state}></textarea></code>
                <input type="submit" className="pressable small-link" id="import-submit" onClick={() => { setContext({ ...context, playlist: JSON.parse(state) }); props.setParentState("playlist") }} value="Import Playlist"></input>
            </form>
        </>
    )
    function goBack() {
        props.setParentState("noAuth");
    }
}
function PlaylistList({ setParentState, setPlaylist }) {
    const [state, setState] = useState({ userName: "loading", playlists: [{ name: "loading", id: -1 }] });
    const [context, setContext] = useContext(PlaylistContext);
    useEffect(() => {
        let spotify_access_token = document.cookie.split("; ").find((row) => row.startsWith("spotify_access_token"));
        if (spotify_access_token) {
            if (spotify_access_token.length > 21) {
                spotify_access_token = spotify_access_token.substring(21);
                if (state.userName === "loading")
                    getPlaylists(spotify_access_token).then(({ userName, playlists }) => { setState({ userName: userName, playlists: playlists }) });
            } else {
                spotify_access_token = undefined;
                setParentState("noAuth")
            }
        }
    });
    return (

        <div className="left-align">
            {!state.playlists && <h2>Loading...</h2>}
            {state.playlists && <><div><h2 className="large-text">Logged in as {state.userName}</h2><button className="pressable small-link logout-button" onClick={goBack}>Back</button></div>
                {state.playlists.map((playlist) => (
                    <button key={playlist.id} className={"pressable small-link playlist-button no-background" + (playlist.id === state ? "-selected" : "")} onClick={() => { selectPlaylist(playlist.id, playlist.name) }}>{playlist.name}</button>
                ))}</>}
        </div>
    )
    function goBack() {
        setParentState("noAuth");
    }
    function selectPlaylist(id, name) {
        let spotify_access_token = document.cookie.split("; ").find((row) => row.startsWith("spotify_access_token"));
        const options = {
            headers: {
                'Authorization': 'Bearer ' + spotify_access_token.substring(21)
            }
        }
        pagerReq(`https://api.spotify.com/v1/playlists/${id}/tracks`, options).then((items) => {
            const playlist = {
                name: name,
                tracks: items.map((item) => item.track.artists.reduce(((prev, curr) => `${prev}${curr.name} `), "") + `- ${item.track.name}`)
            }
            setPlaylist(playlist);
            setContext({ ...context, playlist });
            setParentState("playlist");
        });
    }

}

function Playlist({ setParentState, playlist }) {
    const [context, setContext] = useContext(PlaylistContext);
    const [selected, setSelected] = useState(new Array(playlist.tracks.length).fill(true));//initializes array of all true values
    console.log(selected);
    function goBack() {
        setContext({ ...context, playlist: null });
        setParentState("playlistList");
    }
    return (
        <div className="left-align">
            <div>
                <h2 className="large-text">{`Tracks in ${playlist.name}`}</h2>
                <button className="pressable small-link logout-button" onClick={goBack}>Back</button>
            </div>
            {playlist.tracks.map((track, index) => <div key={index}>{track}
                <input onChange={() => {
                    selected[index] = !selected[index];
                    setSelected(selected.slice());//passes copy of array into state
                    console.log(`box ${index} clicked(${track})`)
                }}
                    type="checkbox" defaultChecked={true}></input>
            </div>)}
        </div>
    )
}
