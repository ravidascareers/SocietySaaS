import api from "./api";

export const getBills = () =>
    api.get("/bill");

export const generateBills = (data) =>
    api.post("/bill/generate", data);

export const getBillById = (id) =>
    api.get(`/bill/${id}`);