import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ResidentsPage from "../pages/ResidentsPage";
import BillingPage from "../pages/BillingPage";
import TowerPage from "../pages/TowerPage";
import FlatPage from "../pages/FlatPage";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<LoginPage />}
                />

                <Route
                    element={<MainLayout />}
                >

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/towers"
                        element={<TowerPage />}
                    />

                    <Route
                        path="/flats"
                        element={<FlatPage />}
                    />

                    <Route
                        path="/residents"
                        element={<ResidentsPage />}
                    />

                    <Route
                        path="/billing"
                        element={<BillingPage />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;