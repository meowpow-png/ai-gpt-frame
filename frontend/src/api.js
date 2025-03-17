import axios from 'axios';

export default axios.create({
  baseURL: '/api', // This will now proxy to http://localhost:8080/api
});