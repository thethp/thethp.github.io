import * as React from "react";
import { Switch, Route, Router } from "wouter";
import HomePage from "../pages/home";
import PlaylistsPage from "../pages/playlists";
import PodcastsPage from "../pages/podcasts";
import FlightEventPage from "../pages/flight-event";

export default () => (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/playlists/:id">
        {(params) => <PlaylistsPage params={params} />}
      </Route>
      <Route path="/playlists" component={PlaylistsPage} />
      <Route path="/podcast" component={PodcastsPage} />
      <Route path="/flight-event" component={FlightEventPage} />
    </Switch>
);
