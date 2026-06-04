export const getUser = () => {

    const user =
        localStorage.getItem("user");

    return user
        ? JSON.parse(user)
        : null;
};

export const getUserId = () => {

    const user =
        getUser();

    return user?.userId ?? 0;
};

export const getTenantId = () => {

    const user =
        getUser();

    return user?.tenantId ?? 0;
};

export const getUserName = () => {

    const user =
        getUser();

    return user?.userName ?? "";
};

export const getTenantName = () => {

    const user =
        getUser();

    return user?.tenantName ?? "";
};

export const isLoggedIn = () => {

    return !!getUser();
};

export const clearSession = () => {

    localStorage.removeItem(
        "user"
    );
};