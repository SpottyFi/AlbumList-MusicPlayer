const { exec } = require('child_process');

const subProcessCallback = (err, stdout, stderr) => {
  if (err) {
    console.log(stderr);
    throw err;
  }
  console.log(stdout);
};

const MIN_ALBUMS = 5000000;
const TOTAL_ARTISTS = MIN_ALBUMS / 4;
const MAX = Math.ceil(TOTAL_ARTISTS / 4);

for (let FILENUM = 1; FILENUM <= 4; FILENUM += 1) {
  exec('node ./seed_data/child_seed.js', { env: { MAX, FILENUM } }, subProcessCallback);
}
console.log('Generating data...');
