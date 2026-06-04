import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/flat`;

export const getFlats = (tenantId) =>
  axios.get(`${API}?tenantId=${tenantId}`)

export const addFlat = (data) =>
    axios.post(API, data);

export const updateFlat = (id, data) =>
    axios.put(`${API}/${id}`,data);

export const deleteFlat = (id) =>
    axios.delete(`${API}/${id}`);



//const API = "http://society-saas.somee.com/api/flat";