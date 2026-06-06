import api from "./api"

export const getTowers = () =>
    api.get("/tower")

export const addTower = (data) =>
    api.post("/tower", data);

export const updateTower = (id, data) =>
    api.put(`/tower/${id}`,data);

export const deleteTower = (id) =>
    api.delete(`/tower/${id}`);


//const API = "http://society-saas.somee.com/api/tower";