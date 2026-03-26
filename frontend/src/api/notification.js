import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:5000/api"

});

export const getNotifications = (userId) =>

  API.get(`/notifications/${userId}`);