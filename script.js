import http from 'k6/http';

export const options = {
  vus: 400,
  duration: '1s',
  rps: 10000,
};

export default function () {
  const id = Math.floor(Math.random() * 250000000) + 1;
  http.get(`http://localhost:3001/artists/albums/${id}`);
}
