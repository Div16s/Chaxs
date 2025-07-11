import Env from './env';

// This file contains the API endpoints for the Chaxs application.
export const BASE_URL = Env.BACKEND_URL;
export const API_URL = `${BASE_URL}/api`;
export const LOGIN_URL = `${API_URL}/auth/login`;
export const CHAT_GROUP = `${API_URL}/chat-group`;
export const CHAT_GROUP_USERS = `${API_URL}/chat-group-users`;
export const CHATS_URL = `${API_URL}/chats`;
