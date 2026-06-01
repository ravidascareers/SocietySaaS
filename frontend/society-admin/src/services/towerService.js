import axios from "axios";

const API = "http://society-saas.somee.com/api/tower";

export const getTowers = () =>
    axios.get(API);

export const addTower = (data) =>
    axios.post(API, data);

export const updateTower = (id, data) =>
    axios.put(`${API}/${id}`,data);

export const deleteTower = (id) =>
    axios.delete(`${API}/${id}`);