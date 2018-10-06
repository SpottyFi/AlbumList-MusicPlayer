const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('newrelic');
const {
  getArtist, postArtist, updateArtist, deleteArtist,
} = require('../database/index.js');

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.get('/artists/albums/:artistID', (req, res) => {
  console.log('Getting artist with id', req.params.artistID);
  getArtist(Number(req.params.artistID)).then(artists => res.send(artists));
});

server.post('/artists/albums', (req, res) => {
  postArtist(req.body, () => res.end());
});

server.put('/artists/albums/:id', (req, res) => {
  updateArtist(req.params.id, req.body, (error) => {
    if (error) {
      console.log(error);
      res.status(500).end(error);
    } else {
      res.end();
    }
  });
});

server.delete('/artists/albums/:id', (req, res) => {
  deleteArtist(req.params.id, (error) => {
    if (error) {
      console.log(error);
      res.status(500).end(error);
    } else {
      res.end();
    }
  });
});

module.exports = server;
