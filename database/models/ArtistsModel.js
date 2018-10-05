module.exports = {
  fields: {
    artist_id: 'int',
    album_id: 'int',
    album_image: 'text',
    album_name: 'text',
    artist_name: 'text',
    published_year: 'int',
    songs: {
      type: 'set',
      typeDef: '<text>',
    },
  },
  key: ['artist_id', 'album_id'],
};
