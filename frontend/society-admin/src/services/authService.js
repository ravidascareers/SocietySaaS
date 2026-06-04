import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/auth`;

export const login = async (loginData) => {
    return await axios.post(
        `${API}/login`,
        loginData
    );
};