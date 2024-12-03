import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.153:5000/api', // Reemplaza con tu IP
});

export default api;