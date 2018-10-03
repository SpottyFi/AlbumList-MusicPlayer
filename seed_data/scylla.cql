-- CREATE KEYSPACE IF NOT EXISTS spottyfi with REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};
-- CREATE TYPE spottyfi.song (
--   song_id int,
--   song_name text,
--   streams int,
--   length int,
--   popularity int
-- );
-- CREATE TYPE spottyfi.album (
--   album_id int,
--   album_name text,
--   album_image text,
--   published_year int,
--   songs list<frozen <song>>,
-- );
-- CREATE TABLE spottyfi.artists (
--   artist_id int PRIMARY KEY,
--   artist_name text,
--   albums list<frozen <album>>,
-- );

-- V2
-- CREATE KEYSPACE IF NOT EXISTS spottyfi with REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};
-- CREATE TYPE spottyfi.song (
--   song_id int,
--   song_name text,
--   streams int,
--   length int,
--   popularity int
-- );
-- CREATE TYPE spottyfi.album (
--   album_id int,
--   album_name text,
--   album_image text,
--   published_year int
-- );
-- CREATE TABLE spottyfi.artists (
--   artist_id int,
--   album_id int,
--   artist_name text,
--   album frozen <album>,
--   songs set<frozen <song>>,
--   PRIMARY KEY (artist_id, album_id)
-- );

--V3
-- CREATE KEYSPACE IF NOT EXISTS spottyfi with REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};
-- CREATE TYPE spottyfi.song (
--   song_id int,
--   song_name text,
--   streams int,
--   length int,
--   popularity int
-- );
-- CREATE TABLE spottyfi.artists (
--   album_id int,
--   artist_id int,
--   artist_name text,
--   album_name text,
--   album_image text,
--   published_year int,
--   songs set<frozen <song>>,
--   PRIMARY KEY (artist_id, album_id)
-- );

--V4
CREATE KEYSPACE IF NOT EXISTS spottyfi with REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};
CREATE TABLE spottyfi.artists (
  album_id int,
  artist_id int,
  artist_name text,
  album_name text,
  album_image text,
  published_year int,
  songs set<text>,
  PRIMARY KEY (artist_id, album_id)
);

INSERT INTO spottyfi.artists 
(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)
VALUES (2, 1, 'Cowboy Guy', 'Cowboy Songs 2', 'mysrc', 1990, { { song_id: 1, song_name: 'a2', streams: 1, length: 30, popularity: 343 } });

INSERT INTO spottyfi.artists 
(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)
VALUES (1, 1, 'Cowboy Guy', 'Cowboy Songs Rewrite', 'mysrc', 1990, { { song_id: 1, song_name: 'a', streams: 1, length: 30, popularity: 343 } });

INSERT INTO spottyfi.artists 
(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)
VALUES (1, 2, 'Random Guy', 'Random Songs', 'mysrc2', 1993, { { song_id: 1, song_name: 'b', streams: 1, length: 30, popularity: 343 } });

INSERT INTO spottyfi.artists 
(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)
VALUES (3, 1, 'Cowboy Guy', 'Cowboy Songs', 'mysrc', 1990, 
{ { song_id: 1, song_name: 'a', streams: 1, length: 30, popularity: 343 }, { song_id: 2, song_name: 'b', streams: 1, length: 30, popularity: 343 } });

./cassandra-loader -f artists_1.csv -host 172.17.0.2 -delim "|" -charsPerColumn 8000 -schema "spottyfi.artists(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)"
./cassandra-loader -f artists_2.csv -host 172.17.0.2 -delim "|" -charsPerColumn 8000 -schema "spottyfi.artists(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)"
docker cp nosql node1:/
