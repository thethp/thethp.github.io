import * as React from "react";
import Grid from './grid.jsx';

export default function Playlist({launchModal, playlistData}) {  

  return (
    <div className="playlist" onClick={() => launchModal(playlistData.id)}>
      <div className="title">{playlistData.title}</div>
      <Grid grid={playlistData.grid} />
    </div>
  );
}
