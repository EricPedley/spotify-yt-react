import React, { useState, useContext, useEffect } from "react"
import PlaylistContext from "./PlaylistContext.jsx";
import path from "../serverURL"
//quota page: https://console.cloud.google.com/apis/api/youtube.googleapis.com/quotas?project=playlist-converter-2
export default function YoutubeHalf() {
    let youtube_access_token = document.cookie.split("; ").find((row) => row.startsWith("youtube_access_token"));
    const [state, setState] = useState(youtube_access_token && youtube_access_token.length > 21 ? "playlistList" : "noAuth");
    // console.log(document.cookie);

    return (
        <div className="col-md-6 half right-half">
            {state === "noAuth" && <LoginButton />}
            {state === "playlistList" && <PlaylistSelect token={youtube_access_token.substring(21)} setParentState={setState} />}
        </div>
    );
}

function LoginButton() {
    return (
        <a href={`${path}youtube/login`} id="youtube-login" className="big-link youtube-colors">
            <h3>Log in with Youtube</h3>
        </a>
    );
}

function PlaylistSelect({token,setParentState}) {
    const [state, setState] = useState({});//contains playlist and error messages?
    const {ytPlaylistID,setYTPlaylistID} = useContext(PlaylistContext);
    useEffect(() => {
        async function fetchPlaylists() {
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            async function pageRequest(url,options) {
                const res = await fetch(url, options);
                const json = await res.json();
                console.log(json)
                const nextPageToken = json.nextPageToken;
                if(nextPageToken){
                    const nextReq = await pageRequest(`${url}&pageToken=${nextPageToken}`,options)
                    return {...json, items: [...json.items, ...nextReq.items]}
                }
                return json;
            }
            const json = await pageRequest("https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true",options);
            fetch(`${path}youtube/quota?cost=1`,{method:"POST"});
            console.log(json);
            var newstate = { ...state, playlists: json.items };
            if (json.error) {
                console.log(json.error);
                newstate = { ...newstate, error: json.error.errors[0].message }
            }
            setState(newstate);
            console.log("setting state", state);
        }
        fetchPlaylists();
    //eslint-disable-next-line
    },[]);//the dependency list is included and left empty on purpose because this useEffect should only run once, so the lint ignore is added
    
    return (
        <div className="left-align">
            {!state.playlists && !state.error && <h2>Loading...</h2>}
            {state.error && <>
                <h2 dangerouslySetInnerHTML={{ __html: state.error }}></h2>
                <h3>
                    Something went wrong. Please submit an issue at<br/>
                    <a href="https://github.com/EricPedley/spotify-yt-react/issues/new/choose" target="_blank" rel="noopener noreferrer">
                        https://github.com/EricPedley/spotify-yt-react/issues/new/choose
                    </a>
                </h3>
            </>}
            {state.playlists && <>
                <div>
                    <h2 className="large-text">Logged in as {state.playlists[0].snippet.channelTitle}</h2>
                    <button className="pressable small-link logout-button" onClick={logOut}>Log Out</button>
                </div>
                {state.playlists.map((playlist) => (
                    <button onClick={() => { setSelected(playlist.id) }} className={`pressable small-link playlist-button ${(ytPlaylistID === playlist.id ? "youtube-colors" : "no-background")}`} key={playlist.id}>{playlist.snippet.title}</button>
                ))}</>}

        </div>

    );

    function setSelected(id) {
        console.log("setting selected for "+id)
        setYTPlaylistID(id);
    }

    function logOut() {
        document.cookie = new URLSearchParams({ youtube_access_token: "" });
        setParentState("noAuth");//function taken from props
        setYTPlaylistID(null);
    }

}
