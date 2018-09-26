const mongoose = require('mongoose');
mongoose.connect('mongodb://spottyfi:spottyfi1!@ds115753.mlab.com:15753/albumlist-musicplayer', { useNewUrlParser: true });

const db = mongoose.connection;


const ArtistSchema = new mongoose.Schema({
  artistID: Number,
  artistName: String,
  albums: [{
    albumID: Number,
    albumName: String,
    albumImage: String,
    publishedYear: Number,
    songs: [{
      songID: Number,
      songName: String,
      streams: Number,
      length: Number,
      popularity: Number,
      addedToLibrary: Boolean
    }]
  }]
});

var Artist = mongoose.model('Artist', ArtistSchema);

var getArtist = (id, cb) => {
  Artist.find({ 'artistID': id }, (err, data) => {
    if (err) {
      throw err;
    }
    cb(data);
  });
};

const postArtist = (data, callback) => {
  const artist = new Artist(data);
  artist.save(callback);
};

const updateArtist = (id, data, callback) => {
  Artist.updateOne({ artistID: id }, { $set: data }, callback);
};

const deleteArtist = (id, callback) => {
  Artist.deleteOne({ artistID: id }, callback);
};

module.exports = {
  Artist,
  db,
  getArtist,
  postArtist,
  updateArtist,
  deleteArtist,
};
