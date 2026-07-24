import axios from "axios";

const api = axios.create({
    baseURL: "https://sari-sari-store-app.onrender.com/api"
});

export default api;