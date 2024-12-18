import axios from "axios";

export const makeRequest = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_KEY}`,
    },
})