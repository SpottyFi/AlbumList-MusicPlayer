#!/bin/sh
for file in ./artists_*.csv
do
  ./cassandra-loader -f "$file" -host 172.17.0.2 -delim "|" -queryTimeout 10 -charsPerColumn 8000 -schema "spottyfi.artists(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)"  >> results.out
done
