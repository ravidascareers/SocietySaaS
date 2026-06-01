import axios from "axios";

const API = "http://society-saas.somee.com/api/flat";

export const getFlats = () =>
    axios.get(API);

export const addFlat = (data) =>
    axios.post(API, data);

export const updateFlat = (id, data) =>
    axios.put(`${API}/${id}`,data);

export const deleteFlat = (id) =>
    axios.delete(`${API}/${id}`);