import React, {useState} from "react";
const PlaylistContext = React.createContext();
export default PlaylistContext;
export function PlaylistContextProvider(props) {
    const [spotifyPlaylist, setSpotifyPlaylist] = useState();
    const [ytPlaylistID, setYTPlaylistID] = useState();
    const [selectedSpotifyTracks, setSelectedSpotifyTracks] = useState();
    return (
        <PlaylistContext.Provider value = {{spotifyPlaylist,setSpotifyPlaylist,ytPlaylistID,setYTPlaylistID,selectedSpotifyTracks,setSelectedSpotifyTracks}}>
            {props.children}
        </PlaylistContext.Provider>
    )
}