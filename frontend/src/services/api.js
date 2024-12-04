import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchTests = () => API.get('/tests');
export const createTest = (test) => API.post('/tests', test);
