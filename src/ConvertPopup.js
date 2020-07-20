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
    const options1 = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const data = {
      "part": "snippet",
      "maxResults": 1,
      "type": "video",
      "q": track
    };
    const searchres = await fetch("https://www.googleapis.com/youtube/v3/search?" + new URLSearchParams(data), options1).then(res => res.json()).catch((err) => {
      console.log(err);
      if (err.message === 'The request cannot be completed because you have exceeded your <a href="/youtube/v3/getting-started#quota">quota</a>.') {
        throw new Error(track)
      }
    });
    console.log(searchres);
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
            "videoId": searchres.items[0].id.videoId
          }
        }
      })
    }
    const insertres = await fetch("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet", options2).then(res => res.json());
    console.log(insertres);
    setState([...state,track])
  }

  return (
    <div id="convert-popup">
      <button className="pressable big-link" id="convert-button" onClick={() => { convert(props) }}><h3>Convert</h3></button>
      {state.length > 0 && <><h2>Finished Tracks:</h2>{state.forEach((track) => <div>{track}</div>)}</>}
    </div>
  )
}

