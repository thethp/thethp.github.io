import * as React from "react";
import './style.css';

export default function Podcast({podcastData}) {  

  return (
    <>
      <div className="podcast">
        <h3>{podcastData.name}</h3>
        <audio controls src={podcastData.url}></audio>
        <p>{podcastData.description}</p>
      </div>
    </>
  );
}
