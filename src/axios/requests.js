import http from './axios';

export const requests = {
  get: (url) => http.get(url),
  post: async (url, body) => http.post(url, body),
  patch: (url, body) => http.patch(url, body),
  delete: (url) => http.delete(url),
};

export default requests;
