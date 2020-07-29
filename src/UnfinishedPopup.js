import React from "react"
export default function UnfinishedPopup(props) {
    return (
        <div>
            <h3>Unfinished tracks in {props.playlist.name}</h3>
            {props.playlist.tracks.map((track)=><div>{track}</div>)}
        </div>
    )
}