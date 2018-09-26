const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { getArtist, postArtist, updateArtist, deleteArtist } = require('../database/index.js');
const cors = require('cors');
const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.get('/artists/albums/:artistID', (req, res) => {
  getArtist(req.params.artistID, data => {
    res.send(data);
  });
});

server.post('/artists/albums', (req, res) => {
  postArtist(req.body, (error) => {
    if (error) {
      console.log(error);
      res.status(500).end(error);
    } else {
      res.end();
    }
  });
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
