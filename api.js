import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.101:5000/api', // Reemplaza con la dirección IP correcta
});

export default api;
