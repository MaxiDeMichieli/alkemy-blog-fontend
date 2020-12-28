import qs from 'querystring';
import http from './axios';

const requests = {
  getPosts: () => http.get('/posts'),
  getPost: (id) => http.get(`/posts/${id}`),
  createPost: (body) => http.post('/posts', qs.stringify(body)),
  patchPost: (id, body) => http.patch(`/posts/${id}`, qs.stringify(body)),
  removePost: (id) => http.delete(`/posts/${id}`),
  getCategories: () => http.get('/posts/categories'),
};

export default requests;
