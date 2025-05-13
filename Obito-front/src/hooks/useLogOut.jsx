"use client";

import { useContext } from "react";
import { ProfileContext } from "../context/profileContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const { updateProfile } = useContext(ProfileContext);
    const navigate = useNavigate();

    const logout = () => {
        // Actualizar el estado inicial en localStorage
        const initialProfile = {
            name: "",
            lastname: "",
            email: "",
            accountid: "",
            active: false,
        };
        localStorage.setItem('profile', JSON.stringify(initialProfile));

        // Actualizar el contexto con los valores iniciales
        updateProfile(initialProfile);

        // Redirigir a la página de login (/)
        navigate("/", { replace: true });
    };

    return { logout };
};