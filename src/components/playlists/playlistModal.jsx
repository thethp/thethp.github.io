import React, { useEffect, useRef } from "react";
import { playlists } from '../../consts.js'
import Playlist from './playlist/playlist.jsx';

export default function PlaylistModal({closeModal, playlistData}) {
  const playerRef = useRef(null);
  
  const playerDimensions = () => {
    let playerWidth = document.querySelector('.playlist-container').clientWidth;
    let playerHeight = playerWidth * .6;
    if (window.innerWidth > 600) {
      playerWidth = document.querySelector('.playlist-container').clientWidth / 3;
      playerHeight = playerWidth;
    }
    
    return {playerWidth,playerHeight};
  }
  
  useEffect(() => {
    const createPlayer = () => {
      if (playerRef.current) return;
      const {playerWidth,playerHeight} = playerDimensions();
      playerRef.current = new window.YT.Player('player', {
        height: playerHeight,
        width: playerWidth,
        videoId: 'qxOkaU6RVz4',
        events: {
          onReady: (e) => {
            e.target.loadPlaylist(playlistData.youtubePlaylist);
            e.target.pauseVideo();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function () {
        if (typeof prevCallback === 'function') prevCallback();
        createPlayer();
      };
      
      window.addEventListener('resize', () => {
        const {playerWidth,playerHeight} = playerDimensions();
        playerRef.current.setSize(playerWidth,playerHeight);
      })
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      closeModal();
    };
  }, [playlistData.youtubePlaylist, closeModal]);
  
  function jumpToTrack(trackNum) {
    playerRef.current.loadPlaylist(playlistData.youtubePlaylist, trackNum);
  }
  
  return (
    <div className='playlist-modal'>
      <div onClick={closeModal} className="close">&#10005;</div>
      <h1>{playlistData.title} </h1>
      <div className="playlist-container">
        <div>
          <div id="player"></div>
          <div className="icons">
            <a target="_blank" href={playlistData.apple}><img src="https://cdn.glitch.global/2bd6014f-d675-41c0-8ff9-1e720ca01f2d/Apple_Music_icon.svg?v=1744733817794" /></a>
            <a target="_blank" href={playlistData.spotify}><img src="https://cdn.glitch.global/2bd6014f-d675-41c0-8ff9-1e720ca01f2d/Spotify_logo_without_text.svg?v=1744733825266" /></a>
            <a target="_blank" href={playlistData.youtube}><img src="https://cdn.glitch.global/2bd6014f-d675-41c0-8ff9-1e720ca01f2d/Youtube_Music_icon.svg?v=1744733829643" /></a>
          </div>
        </div>
        <div>
          <h2>Tracklist</h2>
          <ol>
            {playlistData.tracklist.map((track,i) => <li key={i} onClick={() => jumpToTrack(i)}>{track}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
