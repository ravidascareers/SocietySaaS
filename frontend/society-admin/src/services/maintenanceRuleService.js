import api from "./api";

export const getRules = () =>
    api.get("/maintenancerule");

export const getRuleById = (id) =>
    api.get(`/maintenancerule/${id}`);

export const addRule = (data) =>
    api.post("/maintenancerule", data);

export const updateRule = (id, data) =>
    api.put(`/maintenancerule/${id}`, data);

export const deleteRule = (id) =>
    api.delete(`/maintenancerule/${id}`);