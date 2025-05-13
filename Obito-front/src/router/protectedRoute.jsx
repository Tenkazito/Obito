"use client";

import { Navigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

const ProtectedRoute = ({ children }) => {
    const { profile } = useProfile();

    const isLoggedIn = profile && (profile.email || profile.active);

    if (!isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;