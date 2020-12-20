import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3030/api',
});

export default http;
