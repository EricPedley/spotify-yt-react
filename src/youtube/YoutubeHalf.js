import React, { useState, useContext } from "react"
import PlaylistContext from "../PlaylistContext";
export default function YoutubeHalf() {
    let youtube_access_token = document.cookie.split("; ").find((row) => row.startsWith("youtube_access_token"));
    const [state,setState] = useState(youtube_access_token?"playlistList":"noAuth");
    // console.log(document.cookie);

    return (
        <div className="col-md-6 half right-half">
            {state==="noAuth" && <LoginButton />}
            {state==="playlistList" && <PlaylistSelect token={youtube_access_token} />}
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
    const [state, setState] = useState({});
    const [context,setContext]  = useContext(PlaylistContext);
    const options = {
        headers: {
            Authorization: `Bearer ${props.token.substring(21)}`
        }
    };
    if(!state.playlists)
        fetch("https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true",options).then((res)=>res.json()).then((json)=>{
            setState({...state,playlists:json.items});
        });
    function setSelected(id) {
        setContext({ytID:id, ...context});
        console.log(context);
    }
    return (
                <div className="left-align">
                    {!state.playlists&&<h2>Loading...</h2>}
                    {state.playlists&&<><h2>Logged in as {state.playlists[0].snippet.channelTitle}</h2>
                    {state.playlists.map((playlist) => (
                        <button onClick={()=>{setSelected(playlist.id)}} className={`pressable small-link playlist-button ${(context.ytID===playlist.id?"youtube-colors":"no-background")}`} key={playlist.id}>{playlist.snippet.title}</button>
                    ))}</>}
                    
                </div>
            
    );
}