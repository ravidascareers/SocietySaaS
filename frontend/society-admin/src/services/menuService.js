import api from "./api";

export const getMenus = async () => {

    const response =
        await api.get("/menu");

    return response.data;
};