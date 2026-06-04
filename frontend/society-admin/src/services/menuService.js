import axios from "axios";
import { API_BASE_URL } from "../config/api";

const API = `${API_BASE_URL}/menu`;

export const getMenus = async () => {

    const response =
        await axios.get(API);

    return response.data;
};