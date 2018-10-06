import http from 'k6/http';

export const options = {
  vus: 500,
  duration: '1m',
  rps: 2400,
};

export default function () {
  const id = Math.floor(Math.random() * 250000000) + 1;
  http.get(`http://localhost:3001/artists/albums/${id}`);
}
