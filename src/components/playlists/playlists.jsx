import * as React from "react";
import { useState } from 'react';
import { playlists } from '../../consts.js'
import Playlist from './playlist/playlist.jsx';
import PlaylistModal from './playlistModal.jsx';

export default function Playlists({id:playlistId}) {
  const [showModal, setShowModal] = useState(!!playlistId);
  const [currentPlaylist, setCurrentPlaylist] = useState(playlistId);
  
  function toggleModal(playlistId = '') {
    setShowModal(!showModal);
    setCurrentPlaylist(playlistId);
  }
  
  return (
    <div>
      {
        Object.keys(playlists).reverse().map((playlist, i) => <Playlist key={i} launchModal={toggleModal} playlistData={playlists[playlist]} />)
      }
      {showModal && 
        <PlaylistModal 
          closeModal={toggleModal} 
          playlistData={playlists[currentPlaylist]} 
        />
      }
    </div>
  );
}
