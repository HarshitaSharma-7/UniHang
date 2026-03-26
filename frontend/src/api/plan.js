import axios from "axios";

const API = axios.create({
    baseURL: "https://your-backend-url.onrender.com/api"
});

export const createPlan = (data) =>
    API.post("/plans/create", data);

export const getPlans = () =>
    API.get("/plans/all");

export const joinPlan = (planId, userId) =>
    API.post(`/plans/join/${planId}`, { userId });

export const withdrawPlan = (planId, userId) =>
  API.post(`/plans/withdraw/${planId}`, { userId });

export const deletePlan = (id) =>
API.delete(`/plans/${id}`);

export const getPlanById = (id) =>
  API.get(`/plans/${id}`);