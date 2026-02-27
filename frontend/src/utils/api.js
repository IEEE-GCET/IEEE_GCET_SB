import axios from "axios";

// Base API URL
export const API_BASE_URL = "http://localhost:8000/api/ieeegcetsb";

// API endpoints
export const API_ENDPOINTS = {
  // User endpoints
  USER_REGISTER: `${API_BASE_URL}/user/register`,
  USER_LOGIN: `${API_BASE_URL}/user/login`,
  USER_LOGOUT: `${API_BASE_URL}/user/logout`,
  USER_SESSION: `${API_BASE_URL}/user/session-status`,
  USER_REFRESH: `${API_BASE_URL}/user/refresh-token`,
  USER_ALL: `${API_BASE_URL}/user/all`,
  USER_BY_ID: (id) => `${API_BASE_URL}/user/${id}`,
  USER_UPDATE: (id) => `${API_BASE_URL}/user/update/${id}`,

  // Event endpoints
  EVENT_REGISTER: `${API_BASE_URL}/event/register`,
  EVENT_ALL: `${API_BASE_URL}/event/all`,
  EVENT_BY_ID: (id) => `${API_BASE_URL}/event/${id}`,
  EVENT_UPDATE: (id) => `${API_BASE_URL}/event/update/${id}`,
  EVENT_UPLOAD_IMAGES: `${API_BASE_URL}/event/upload-images`,
  EVENT_DELETE_IMAGE: (publicId) => `${API_BASE_URL}/event/delete-images/${publicId}`,

  // Society endpoints
  SOCIETY_REGISTER: `${API_BASE_URL}/society/register`,
  SOCIETY_ALL: `${API_BASE_URL}/society/all`,
  SOCIETY_BY_ID: (id) => `${API_BASE_URL}/society/${id}`,
  SOCIETY_UPDATE: (id) => `${API_BASE_URL}/society/update/${id}`,
};

// Default axios config
export const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
