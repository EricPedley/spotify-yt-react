import React, { useState } from "react";
import path from "./serverURL"
export default function ConvertPopup(props) {
  const [state, setState] = useState("button");
  console.log("rerending");
  async function convert({ playlist, ytID }) {
    setState("finished");
    let youtube_access_token = document.cookie.split("; ").find((row) => row.startsWith("youtube_access_token"));
    console.log(JSON.stringify(playlist));
    const tracks = playlist.tracks;
    let numErrors = 0;
    while (tracks.length > 0) {
      const track = tracks.shift();
      const error = await convertOne(track, ytID, youtube_access_token.substring(21));
      if (error) {
        tracks.push(track);
        console.log(playlist);
        if (tracks.length === numErrors || error === "quota error") {//stop loop from running
          const finishedDiv = document.getElementById("finished");
          finishedDiv.innerHTML = (error==="quota error")
            ?"<h3>Quota Exceeded, tracks remaining:</h3>"
            :"<h3>Unknown Error, tracks remaining:</h3>";
          tracks.forEach((track) => {
            finishedDiv.innerHTML += `${track}<br>`;
          });
          finishedDiv.innerHTML += `<h4>JSON format:</h4><code>${JSON.stringify(playlist)}</code>`
          break;
        }
        numErrors++;
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
    //following line is a 404 error when deployed on heroku but not in dev server or local build
    const insertres = await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet", options2).then(res => res.json());//insert track into playlist
    if (insertres.error) {
      if (insertres.error.message.includes("exceeded")) {
        return "quota error";
      } else {
        return insertres.error.message;
      }
    }
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
