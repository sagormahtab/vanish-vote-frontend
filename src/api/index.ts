import axios from "axios";
import { API_BASE_URL } from "../config/constant";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const pollsApi = {
  create: async (data: {
    question: string;
    options: string[];
    expiresIn: number;
    hideResults?: boolean;
    isPrivate?: boolean;
  }) => {
    const response = await api.post("/polls", data);
    return response.data.data;
  },

  get: async (id: string) => {
    const response = await api.get(`/polls/${id}`);
    return response.data.data;
  },

  vote: async (pollId: string, optionId: string) => {
    const response = await api.post(`/polls/${pollId}/vote`, { optionId });
    return response.data.data;
  },

  react: async (pollId: string, type: "trending" | "like") => {
    const response = await api.post(`/polls/${pollId}/reactions`, { type });
    return response.data.data;
  },

  getAll: async () => {
    const response = await api.get("/polls");
    return response.data.data;
  },
};

export const commentsApi = {
  getAll: async (pollId: string) => {
    const response = await api.get(`/polls/${pollId}/comments`);
    return response.data.data;
  },

  create: async (pollId: string, content: string) => {
    const response = await api.post(`/polls/${pollId}/comments`, { content });
    return response.data.data;
  },
};
