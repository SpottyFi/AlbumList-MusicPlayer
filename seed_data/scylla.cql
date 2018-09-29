CREATE KEYSPACE IF NOT EXISTS spottyfi with REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};
CREATE TYPE spottyfi.song (
  songID int,
  songName text,
  streams int,
  length int,
  popularity int,
  addedToLibrary boolean,
);
CREATE TYPE spottyfi.album (
  albumID int,
  albumName text,
  albumImage text,
  publishedYear int,
  songs set<frozen <song>>,
);
CREATE TABLE spottyfi.artists (
  artistID int PRIMARY KEY,
  artistName text,
  albums set<frozen <album>>,
);