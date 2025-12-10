import React, { useState, useEffect } from "react";
import { Router, Link, useLocation } from "wouter";

/**
* This code defines the react app
*
* Imports the router functionality to provide page navigation
* Defines the Home function outlining the content on each page
* Content specific to each page (Home and About) is defined in their components in /pages
* Each page content is presented inside the overall structure defined here
* The router attaches the page components to their paths
*/

// Import and apply CSS stylesheet
import "./styles/styles.css";

// Where all of our pages come from
import PageRouter from "./components/router.jsx";

// The component that adds our Meta tags to the page
import Seo from './components/seo.jsx';
const pages = [ 
  {url: '/', name: 'home'}, 
  {url: '/playlists', name: 'playlists'},
  {url: '/podcast', name: 'podcast'}
  {url: '/flight-event', name: 'flight event'}
];

// Home function that is reflected across the site
export default function Home() {
  const [location] = useLocation();
  const displayPages = pages.filter(page => page.url != location);
  return (
    <Router>
      <Seo />
      <header className="header">
        <h1>{location.substring(1) ? location.substring(1) : 'Home'}</h1>
        {displayPages.map((page,i) => <Link key={i} href={page.url}>{page.name}</Link>)}
      </header>
      <main role="main" className="wrapper">
        <div className="content">
          {/* Router specifies which component to insert here as the main content */}
          <PageRouter />
        </div>
      </main>
      <footer>
        <img src="https://cdn.glitch.global/2bd6014f-d675-41c0-8ff9-1e720ca01f2d/IMG_7366.png?v=1744750728976"/>
      </footer>
    </Router>
  );
}
