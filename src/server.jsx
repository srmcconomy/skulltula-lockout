// @flow

import { createStore } from 'redux';
import { List } from 'immutable';
import { Provider } from 'react-redux';
import express from 'express';
import http from 'http';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import socketio from 'socket.io';
import type EventEmitter from 'events';
import cookieParser from 'cookie-parser';
import { match } from 'react-router';
import serialize from 'serialize-javascript';

import routes from './util/routes';
import { serverReducers } from './reducers';
import initSockets from './util/serverSockets';
import App from './components/App';
import config from '../config';
import storeListenerEnhancer from './util/storeListenerEnhancer';

const enhancedCreateStore = storeListenerEnhancer(createStore);
const app = express();
const server = http.Server(app);
const store = enhancedCreateStore(serverReducers);
initSockets(server, store);

server.listen(process.env.PORT || config.ports.express);

app.use(cookieParser());

app.use('/assets', express.static(
  path.join(__dirname, 'static')
));

app.use('/images', express.static(path.join(__dirname, '../assets/images')));

app.use('/fonts', express.static(path.join(__dirname, '../assets/fonts')));

let jsFile;
if (process.env.NODE_ENV === 'production') {
  jsFile = `/assets/${config.files.client.out}/${config.files.client.outFile}`;
} else {
  jsFile = `http://localhost:${config.ports.webpack}/${config.files.client.out}/${config.files.client.outFile}`;
}

app.use((req, res) => {
  const { matchID, playerID } = req.cookies;
  let player = null;
  if (
    store.getState().matches.has(matchID) &&
    store.getState().matches.get(matchID).players.has(playerID)
  ) {
    player = store.getState().matches.get(matchID).players.get(playerID);
  }
  match(
    { routes: routes(store, () => player), location: req.url },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        console.log('redirect')
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.log(error);
        res.status(500).send('An internal error has occurred');
      } else if (!renderProps) {
        res.status(404).send('Not Found');
      } else {
        const state = store.getState();
        state.self = player;
        const html = `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="shortcut icon" href="/images/gold-skulltula.png">
            <link rel="stylesheet" type="text/css" href="/assets/css/main.css">
            <title>Skulltula Lockout</title>
          </head>
          <body>
            <div id="root"></div>
            <script async defer src="${jsFile}"></script>
            <script>document.INITIAL_STATE = ${serialize(state)}</script>
          </body>
        </html>`;
        res.send(html);
      }
    }
  );
});
