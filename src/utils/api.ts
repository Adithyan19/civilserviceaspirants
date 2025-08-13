import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
if (BACKEND_URL == null || BACKEND_URL.length === 0) {
    throw new Error("Invalid BACKEND_URL set");
}

export const api = axios.create({
    baseURL: BACKEND_URL,
});
