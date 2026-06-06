import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser =
            localStorage.getItem("user");

        if (storedUser) {

            setUser(
                JSON.parse(storedUser)
            );
        }

    }, []);

    const login = (userData) => {

        localStorage.setItem(
            "token",
            userData.token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    const logout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
    };

    const getUserId = () =>
        user?.userId ?? 0;

    const getTenantId = () =>
        user?.tenantId ?? 0;

    const getUserName = () =>
        user?.userName ?? "";

    const getTenantName = () =>
        user?.tenantName ?? "";

    return (
        <AuthContext.Provider
            value={{
                user,

                login,
                logout,

                getUserId,
                getTenantId,
                getUserName,
                getTenantName,

                isAuthenticated:
                    !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
    useContext(AuthContext);