import React, { useState } from "react";
export default function ConvertPopup(props) {
  const [state, setState] = useState([]);

  function convert({ playlist, ytID }) {
    let youtube_access_token = document.cookie.split("; ").find((row) => row.startsWith("youtube_access_token"));
    console.log(JSON.stringify(playlist));
    const tracks = playlist.tracks;
    while (tracks.length > 0) {
      const track = tracks.pop();
      try{
      convertOne(track,ytID,youtube_access_token.substring(21));
      }catch(error) {
        tracks.push(error.message);
          console.log(playlist);
          alert("quota exceeded, remaining songs are in console");
        
      }
    }
    console.log(tracks, ytID, playlist);
  }
  async function convertOne(track, ytID, token) {
    const {id:vidID} = await fetch(`http://localhost:8888/youtube-search?term=${track}`).then(res=>res.json());
    const options2 = {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      body: JSON.stringify({
        "snippet": {
          "playlistId": ytID,
          "resourceId": {
            "kind": "youtube#video",
            "videoId": vidID
          }
        }
      })
    }
    const insertres = await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet", options2).then(res => res.json());
    console.log(insertres);
    setState([...state,track])
    document.getElementById("finished").innerHTML+=`<div>${track}</div>`
  }

  return (
    <div id="convert-popup">
      <button className="pressable big-link" id="convert-button" onClick={() => { convert(props) }}><h3>Convert</h3></button>
      {state.length > 0 && <div id="finished"><h4>Finished Tracks:</h4></div>}
    </div>
  )
}
