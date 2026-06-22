import api from "./api";

export const getBindings = () =>
    api.get("/maintenancerulebinding");

export const getBindingById = (id) =>
    api.get(
        `/maintenancerulebinding/${id}`
    );

export const getEntitiesByType =
    (entityType) =>
        api.get(
            `/maintenancerulebinding/entities/${entityType}`
        );

export const addBinding = (data) =>
    api.post(
        "/maintenancerulebinding",
        data
    );

export const updateBinding =
    (id, data) =>
        api.put(
            `/maintenancerulebinding/${id}`,
            data
        );

export const deleteBinding =
    (id) =>
        api.delete(
            `/maintenancerulebinding/${id}`
        );