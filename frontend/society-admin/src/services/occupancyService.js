import api from "./api";

export const getOccupancies = () =>
    api.get("/occupancy");

export const getOccupancyHistory = (flatId) =>
    api.get(`/occupancy/history/${flatId}`);

export const addOccupancy = (data) =>
    api.post("/occupancy", data);

export const updateOccupancy = (id, data) =>
    api.put(`/occupancy/${id}`, data);

export const vacateOccupancy = (id, data) =>
    api.put(`/occupancy/vacate/${id}`, data);