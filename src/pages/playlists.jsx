import * as React from "react";
import { animated } from "react-spring";
import { Link } from "wouter";
import Playlists from '../components/playlists/playlists.jsx';


export default function PlaylistsPage({params = {}}) {
  console.log('params',params)
  return (
    <>
      <summary>
        <p>
          I listen to a pretty wide variety of music, and tend to bop around from playlist to playlist, liking random songs as I do so. In 2025 I decided that every month I would whittle down everything I saved that month to a 20 song playlist- clicking on any of the months below will allow you to listen to them, and links for spotify, apple music or youtube play.
        </p>
        <p>
          <b>NOTE:</b> I have not yet figured out how to keep youtube from autoplaying in "prod". It doesn't happen locally, and I'm basically just futzing with all of this 'til I'm happy. I'm sorry for the audio assault when the modal opens. Also, it gets a lil silly lookin past a certain width. It's a work in progress.
        </p>
        <p>
          The "album art" is made by taking a hex code from a pixel of an image I took each day, then using those to fill a 6x6 grid. In order to fill the full square with a month of pictures, I assign some days a higher personal signifigance and alot them extra squares, filling in the grid first to the right where possible, then moving down so that squares for any given day are always adjacent.
        </p>
      </summary>
      <Playlists id={params.id || ''} />
    </>
  );
}
