import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/residents`;

export const getResidents = (tenantId) =>
    axios.get(`${API}?tenantId=${tenantId}`)

export const getResidentById = (id) =>
    axios.get(`${API}/${id}`);

export const addResident = (data) =>
    axios.post(API, data);

export const updateResident = (id, data) =>
    axios.put(`${API}/${id}`,data);

export const deleteResident = (id) =>
    axios.delete(`${API}/${id}`);


//const API = "http://society-saas.somee.com/api/residents";