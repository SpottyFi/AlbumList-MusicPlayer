CREATE KEYSPACE IF NOT EXISTS spottyfi with REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};
CREATE TYPE spottyfi.song (
  song_id int,
  song_name text,
  streams int,
  length int,
  popularity int
);
CREATE TYPE spottyfi.album (
  album_id int,
  album_name text,
  album_image text,
  published_year int,
  songs list<frozen <song>>,
);
CREATE TABLE spottyfi.artists (
  artist_id int PRIMARY KEY,
  artist_name text,
  albums list<frozen <album>>,
);

INSERT INTO spottyfi.artists 
(artist_id, artist_name, albums) 
VALUES ( 1, 'John', [ 
  { 
    album_id: 1, 
    album_name: 'a', 
    album_image: 'b', 
    published_year: 1990,
    songs: [
      {
        song_id: 1,
        song_name: 'a',
        streams: 1,
        length: 30,
        popularity: 343
      }
    ]
  } 
]);

COPY artists FROM '/seed_data/artists.csv' WITH HEADER=TRUE AND DELIMITER=',';
