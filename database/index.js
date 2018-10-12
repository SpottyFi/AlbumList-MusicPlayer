const models = require('express-cassandra');
const path = require('path');

models.setDirectory(path.join(__dirname, '/models')).bind(
  {
    clientOptions: {
      contactPoints: ['34.219.82.131'],
      protocolOptions: { port: 9042 },
      keyspace: 'spottyfi',
      queryOptions: { consistency: models.consistencies.one },
    },
    ormOptions: {
      defaultReplicationStrategy: {
        class: 'SimpleStrategy',
        replication_factor: 1,
      },
      migration: 'safe',
    },
  },
  (err) => {
    if (err) throw err;
  },
);

const getArtist = (id, next) => models.instance.Artists
  .findAsync({ artist_id: id })
  .catch(next);

const postArtist = (data, callback) => {
  if (!Array.isArray(data)) {
    const artist = new models.instance.Artists(data);
    artist.save(callback);
  }
  const queries = data.map(artistData => new models.instance.Artists(artistData)
    .save({ return_query: true }));
  models.doBatch(queries, (err) => {
    if (err) {
      throw err;
    }
    callback();
  });
};

const updateArtist = (id, data, callback) => {
  // Artist.updateOne({ artistID: id }, { $set: data }, callback);
};

const deleteArtist = (id, callback) => {
  // Artist.deleteOne({ artistID: id }, callback);
};

module.exports = {
  getArtist,
  postArtist,
  updateArtist,
  deleteArtist,
};
