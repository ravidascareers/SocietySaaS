import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/tower`;

export const getTowers = (tenantId) =>
    axios.get(`${API}?tenantId=${tenantId}`)

export const addTower = (data) =>
    axios.post(API, data);

export const updateTower = (id, data) =>
    axios.put(`${API}/${id}`,data);

export const deleteTower = (id) =>
    axios.delete(`${API}/${id}`);


//const API = "http://society-saas.somee.com/api/tower";