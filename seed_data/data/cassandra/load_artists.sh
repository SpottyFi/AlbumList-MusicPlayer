#!/bin/sh
for file in ./artists_*.csv
do
  ./cassandra-loader -f "$file" -host localhost -delim "|" -charsPerColumn 8000 -queryTimeout 20 -schema "spottyfi.artists(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)"  >> results.out
done

# ./cassandra-loader -f artists_1.csv -host 54.149.205.35 -delim "|" -ssl-keystore-path ec2-key-pair.pem -ssl-keystore-pw '' -queryTimeout 10 -charsPerColumn 8000 -schema "spottyfi.artists(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)" 
# ./cassandra-loader -f artists_1.csv -host ec2-user@ec2-54-186-194-2.us-west-2.compute.amazonaws.com -delim "|" -ssl-keystore-path ec2-key-pair.pem -ssl-keystore-pw '' -charsPerColumn 8000 -schema "spottyfi.artists(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)" 
# COPY spottyfi.artists(album_id, artist_id, artist_name, album_name, album_image, published_year, songs) FROM 'artists_1.csv' WITH DELIMITER='|' AND MINBATCHSIZE=1 AND MAXBATCHSIZE=1;
# ./cassandra-loader -f artists_1.csv -host 34.219.82.131 -delim "|" -charsPerColumn 8000 -queryTimeout 20 -schema "spottyfi.artists(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)"
# ./cassandra-unloader -host localhost -f delim -schema "spottyfi.artists(album_id, artist_id, artist_name, album_name, album_image, published_year, songs)"
