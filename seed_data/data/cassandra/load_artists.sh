#!/bin/sh
for file in ./artists_*.csv
do
  ./cassandra-loader -f "$file" -host localhost -delim "|" -charsPerColumn 8000 -schema "spottyfi.artists(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)"  >> results.out
done
