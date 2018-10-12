require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const redis = require('redis');
const { promisify } = require('util');
const {
  getArtist, postArtist, updateArtist, deleteArtist,
} = require('../database/index.js');

const server = express();

const cache = redis.createClient(6379, '54.214.93.216');
const getAsyncCache = promisify(cache.get).bind(cache);

server.use(bodyParser.json());
server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, '../public')));

server.get('/artists/albums/:artistID', (req, res, next) => {
  const checkDb = () => getArtist(Number(req.params.artistID), next).then((artists) => {
    cache.setex(req.params.artistID, 604800, JSON.stringify(artists));
    res.send(artists).end();
  });

  getAsyncCache(req.params.artistID)
    .then((result) => {
      if (result === null || result === '') {
        return checkDb();
      }
      return res.send(JSON.parse(result)).end();
    })
    .catch(checkDb);
});

server.post('/artists/albums', (req, res) => {
  postArtist(req.body, () => res.end());
});

server.put('/artists/albums/:id', (req, res) => {
  updateArtist(req.params.id, req.body, (error) => {
    if (error) {
      // console.log(error);
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
