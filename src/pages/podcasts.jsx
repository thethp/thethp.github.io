import * as React from "react";
import { animated } from "react-spring";
import { Link } from "wouter";
import { podcasts } from "../consts.js";
import Podcast from "../components/podcast/podcast.jsx";

export default function PodcastsPage() {
  console.log('THP',podcasts)
  return (
    <>
      <summary>
        <p>
          The perfect videogame podcast is a monthly podcast I do with my two friends Marlowe and Otto. Each month we all play the same game and reflect on it from our different gameplay ability levels. [Spoiler: I am not very good at them!]
        </p>
      </summary>
      <div className="podcasts">
        {podcasts.map((podcast,i) => <Podcast key={i} podcastData={podcast}/> )}
      </div>
    </>
  );
}
