import { create } from 'apisauce';

const api = create({
  baseURL: 'https://agromarket-api-v2.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api;
