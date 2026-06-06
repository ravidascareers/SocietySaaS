import api from "./api"

export const getFlats =()=>
    api.get("/flat");

export const addFlat = (data) =>
    api.post("/flat", data);

export const updateFlat = (id, data) =>
    api.put(`/flat/${id}`,data);

export const deleteFlat = (id) =>
    api.delete(`/flat/${id}`);



//const API = "http://society-saas.somee.com/api/flat";