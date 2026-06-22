import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ResidentsPage from "../pages/ResidentsPage";
import BillingPage from "../pages/BillingPage";
import TowerPage from "../pages/TowerPage";
import FlatPage from "../pages/FlatPage";
import MainLayout from "../layouts/MainLayout";
import OccupanyBoardPage from "../pages/OccupancyBoardPage";
import MaintenanceRulePage from "../pages/MaintenanceRulePage";
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
                        path="/occupancy"
                        element={<OccupanyBoardPage />}
                    />

                    <Route
                        path="/billing"
                        element={<BillingPage />}
                    />
                    <Route
                        path="/maintenance-rule"
                        element={<MaintenanceRulePage />}
                    />


                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;