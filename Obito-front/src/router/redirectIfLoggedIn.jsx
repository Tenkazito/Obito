"use client";

import { Navigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

const RedirectIfLoggedIn = ({ children }) => {
    const { profile } = useProfile();

    const isLoggedIn = profile && (profile.email || profile.active);

    if (isLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default RedirectIfLoggedIn;