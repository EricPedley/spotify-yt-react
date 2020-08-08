import React, { useState } from "react";
import path from "./serverURL"
export default function ConvertPopup(props) {
  const [state, setState] = useState("button");
  console.log("rerending");
  async function convert({ playlist, ytID }) {
    let youtube_access_token = document.cookie.split("; ").find((row) => row.startsWith("youtube_access_token"));
    console.log(JSON.stringify(playlist));
    const tracks = playlist.tracks;
    while (tracks.length > 0) {
      const track = tracks.pop();
      const error = await convertOne(track, ytID, youtube_access_token.substring(21));
      if (error) {
        tracks.push(track);
        console.log(playlist);
        setState("finished");
        const finished = document.getElementById("finished");
        if(error==="quota error")
          finished.innerHTML = "<h3>Quota Exceeded, tracks remaining:</h3>";//TODO: replace janky innerhtml stuff with a react component
        else 
          finished.innerHTML="<h3>Unknown Error, tracks remaining:</h3>";
        tracks.forEach((track) => {
          finished.innerHTML += `${track}<br>`;
        });
        finished.innerHTML += `<h4>JSON format:</h4><code>${JSON.stringify(playlist)}</code>`
        break;
      }
    }

    console.log(tracks, ytID, playlist);
  }
  async function convertOne(track, ytID, token) {
    const { id: vidID } = await fetch(`${path}youtube-search?term=${track}`).then(res => res.json());
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
    const insertres = await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet", options2).then(res => res.json());//insert track into playlist
    if (insertres.error) {
      if (insertres.error.message.includes("exceeded")) {
       return "quota error";
      } else {
        return insertres.error.message;
      }
    }
    setState("finished");
    console.log(insertres);
    document.getElementById("finished").innerHTML += `<div>${track}</div>`//TODO janky innerhtml stuff, replace with react component
    return false;
  }

  return (
    <div id="convert-popup" className="big-link">
      {state === "button" && <button className="pressable big-link" id="convert-button" onClick={() => { convert(props) }}><h3>Convert</h3></button>}
      {state === "finished" && <div id="finished"><h4>Finished Tracks:</h4></div>}
    </div>
  )
}
