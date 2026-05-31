import axios from "axios";

const API = "http://localhost:5008/api/residents";

export const getResidents = () =>
    axios.get(API);

export const getResidentById = (id) =>
    axios.get(`${API}/${id}`);

export const addResident = (data) =>
    axios.post(API, data);

export const updateResident = (id, data) =>
    axios.put(`${API}/${id}`,data);

export const deleteResident = (id) =>
    axios.delete(`${API}/${id}`);