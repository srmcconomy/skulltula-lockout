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

import App from './components/App';
import config from '../config';


const app = express();
const server = http.Server(app);
const io: EventEmitter = socketio(server);

server.listen(process.env.PORT || config.ports.express);

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

app.get('/', (req, res) => {
  const html = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" href="./src/favicon.ico">
      <link rel="stylesheet" type="text/css" href="/assets/css/main.css">
      <title>Commentary Helper</title>
    </head>
    <body>
      <div id="root"></div>
      <script async defer src="${jsFile}"></script>
    </body>
  </html>`;
  res.send(html);
});

io.on('connection', (socket: EventEmitter) => {
  socket.emit('set', store.getState());
  const dispose = store.subscribe(action => {
    if (!action.fromSocket) {
      socket.emit('dispatch', action);
    }
  });
  socket.on('dispatch', (action) => {
    switch (action.type) {
      case 'set-transform':
        action.transform = new TransformRecord(action.transform);
        break;

      case 'set-stream': case 'set-and-select-stream':
        action.stream = new StreamRecord(action.stream);
        break;

      case 'set-race':
        action.entrants = List(action.entrants);
        break;

      default:
    }
    store.dispatch({
      fromSocket: true,
      ...action,
    });
  });
  socket.on('disconnect', dispose);
});
