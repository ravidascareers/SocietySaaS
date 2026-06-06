import axios from "axios";
import { API_BASE_URL } from "../config/api";

import api from "./api"

const API = `${API_BASE_URL}/residents`;

export const getResidents = () =>
    api.get(`/residents`)

export const getResidentById = (id) =>
    api.get(`/residents/${id}`);

export const addResident = (data) =>
    api.post("/residents", data);

export const updateResident = (id, data) =>
    api.put(`$/residents/${id}`,data);

export const deleteResident = (id) =>
    api.delete(`/residents/${id}`);


//const API = "http://society-saas.somee.com/api/residents";