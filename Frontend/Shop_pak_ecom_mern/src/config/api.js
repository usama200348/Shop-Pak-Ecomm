// Centralized API configuration
const rawUrl = import.meta.env.VITE_API_URL;

export const API_URL = rawUrl && rawUrl.trim() !== ""
  ? rawUrl.trim().replace(/\/+$/, "")
  : "http://localhost:5000";

export default API_URL;
