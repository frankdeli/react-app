import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-api-url.com', // Replace with your API base URL
});

export default api;