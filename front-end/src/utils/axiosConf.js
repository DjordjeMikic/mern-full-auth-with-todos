import axios from 'axios';

let token = localStorage.getItem('bearer') ? localStorage.getItem('bearer') : null;

export default axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Auhorization': `bearer ${token}`
  }
})
