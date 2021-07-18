import React, { useState,useContext } from "react";
import path from "../serverURL"
import QuotaContext from "./QuotaContext.jsx";

export default function ConvertPopup(props) {
  const {quota,setQuota} = useContext(QuotaContext);

  const [state, setState] = useState("button");
  const [trackList, setTrackList] = useState([]);
  const [header, setHeader] = useState(<h3>Converting Tracks<img id="loading" alt = "loading icon" src="images/loading.gif"></img></h3>);
  const [footer, setFooter] = useState();

  async function convert({spotifyPlaylist, selectedSpotifyTracks,ytPlaylistID}) {
    let youtube_access_token = document.cookie.split("; ").find((row) => row.startsWith("youtube_access_token"));
    console.log(JSON.stringify(spotifyPlaylist));
    const tracks = spotifyPlaylist.tracks;
    const finished = [];
    let numErrors = 0;
    let currentQuota = quota;
    let index=-1;//starts at -1 because it's incremented before use
    while (tracks.length > 0) {
      const track = tracks.shift();
      index++;
      if(!selectedSpotifyTracks[index])
        continue;
      try {
        await convertOne(track, ytPlaylistID, youtube_access_token.substring(21));
        fetch(`${path}youtube/quota?cost=50`,{method:"POST"});
        currentQuota-=50;
        setQuota(currentQuota);
        finished.push(track);
        setTrackList([...finished]);
      } catch ({message}) {
        numErrors++;
        tracks.push(track);
        console.log(spotifyPlaylist);
        if (message === "search error: id is -1")
          console.log(`error with searching yt video for ${track}`);
        console.log(tracks,numErrors);
        if (tracks.length === numErrors || message === "quota error") {//stop loop from running
          setHeader((message === "quota error")
            ? <h3>Quota Exceeded, tracks remaining:</h3>
            : <h4>Error, conversion stopped, tracks remaining:</h4>);
          setTrackList(tracks);
          setFooter(<><h4>JSON format:</h4><code>{JSON.stringify(spotifyPlaylist)}</code></>);
          break;
        }
      }
    }
    setHeader(<h3>Done!</h3>);
    setFooter(<>
      <a className="small-link youtube-colors" target="_blank" rel="noopener noreferrer" href={`https://www.youtube.com/playlist?list=${ytPlaylistID}`}>Link to Playlist</a><br></br>
      <a className="small-link white-background" href="/">Convert Another</a>
      {tracks.length>0&&<>
        <h4>Tracks unable to be converted:</h4>
        <h5>JSON format:</h5>
        <code>{JSON.stringify(spotifyPlaylist)}</code>
      </>}
    </>);

    console.log(tracks, ytPlaylistID, spotifyPlaylist);
  }

  async function convertOne(track, ytPlaylistID, token) {
    const { id: vidID } = await fetch(`${path}youtube/search?term=${track}`).then(res => res.json());
    if (vidID === -1)
      throw Error("search error: id is -1");
    const options2 = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      body: JSON.stringify({
        "snippet": {
          "playlistId": ytPlaylistID,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": vidID
          }
        }
      })
    }
    const insertres = await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet", options2).then(res => res.json());//insert track into playlist
    if (insertres.error) {
      if (insertres.error.message.includes("exceeded")) {
        throw Error("quota error");
      } else {
        throw Error(insertres.error.message);
      }
    }
    console.log(insertres);
    return false;
  }

  return (
    <div id="convert-popup" className="big-link">
      {state === "button" && <button className="pressable big-link" id="convert-button" onClick={() => { setState("result-list"); convert(props) }}><h3>Convert</h3></button>}
      {state === "result-list" && <div id="popup">
        {header}
        {footer}
        {trackList.map((track, index) => <div key={index}>{track}</div>)}
      </div>}
    </div>
  )

}
