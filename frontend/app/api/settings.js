import axios from "axios";

export const user = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
    // headers: { mode: 'no-cors', 'Access-Control-Allow-Origin': 'http://localhost:8080' }
});
