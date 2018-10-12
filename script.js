import http from 'k6/http';

export const options = {
  vus: 100,
  duration: '1m',
  rps: 3000,
};

export default function () {
  const id = Math.floor(Math.random() * (2500000 - 2000000)) + 2000000; // Test last 20% of ids
  // const id = Math.floor(Math.random() * 2500000) + 1;
  // http.get(`http://54.200.106.231/artists/albums/${id}`, { tags: { name: 'PostsItemURL' } }); // Node1
  http.get(`http://52.38.108.191/artists/albums/${id}`, { tags: { name: 'PostsItemURL' } }); // Nginx
}
