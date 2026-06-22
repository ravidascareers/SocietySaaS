import api from "./api";

export const getBindings = () =>
    api.get("/maintenancerulebinding");

export const addBinding = (data) =>
    api.post("/maintenancerulebinding", data);

export const updateBinding = (id, data) =>
    api.put(`/maintenancerulebinding/${id}`, data);

export const deleteBinding = (id) =>
    api.delete(`/maintenancerulebinding/${id}`);