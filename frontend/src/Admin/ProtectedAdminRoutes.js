import React, { useSelector } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdminRoutes() {
    const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

    return (
        userInfoFromStorage.idAdmin ? <Outlet /> : <Navigate to='/' />
    );
}
export default ProtectedAdminRoutes;