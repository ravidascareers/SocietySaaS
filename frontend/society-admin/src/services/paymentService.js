import api from "./api";

export const collectPayment = (data) =>
    api.post("/payment", data);