import axios from 'axios';

const http = axios.create({
  baseURL: 'https://challenge-alkemy-blog.herokuapp.com/api',
});

export default http;
