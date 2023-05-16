import axios from 'axios';

const baseURL = process.env.REACT_APP_API_ORIGIN;
console.log(baseURL);
const serverapi = axios.create();

serverapi.defaults.baseURL = baseURL;

export default serverapi;
