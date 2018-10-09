import http from 'k6/http';

export const options = {
  vus: 400,
  duration: '1m',
  rps: 3000,
};

export default function () {
  const id = Math.floor(Math.random() * (2500000 - 2000000)) + 2000000;
  // const id = Math.floor(Math.random() * 2500000) + 1;
  http.get(`http://localhost:3001/artists/albums/${id}`);
}
