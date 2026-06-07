import api from "./api"

export const getFlatTypes =() => 
    api.get("/flattype");