import axios from "axios";

const API = axios.create({

  baseURL: "https://your-backend-url.onrender.com/api"

});

export const getMessages = (planId) =>
  API.get(`/messages/${planId}`);