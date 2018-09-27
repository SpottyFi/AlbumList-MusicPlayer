# SpottyFi

> Mock Spotify web app for Hack Reactor systems design capstone project

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [API](#api)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

> Some usage instructions

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## API
Artist schema:
```
{
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
}
```
### Artists
#### GET an Artist
> Endpoint: /artists/albums/:id
> Descriptio: where :id is equal to the ID of the artist you want to GET
> Response: Artist

#### POST an Artist
> Endpoint: /artists/albums
> Descriptio: where the content type is JSON and the body is the Artist you want to POST
> Response: none

#### UPDATE an Artist
>  Endpoint: /artists/albums:id
> Descriptio: where :id is equal to the ID of the artist and the body is the Artist data you want to UPDATE
> Response: none

#### DELETE an Artist
>  Endpoint: /artists/albums/:id
> Descriptio: where :id is equal to the ID of the artist you want to DELETE
> Response: none
