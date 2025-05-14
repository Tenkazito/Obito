import { useState } from "react";
import { ProfileContext } from "./profileContext";

export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(() => {
        // Cargar datos de localStorage al inicializar
        const savedProfile = localStorage.getItem('profile');
        return savedProfile ? JSON.parse(savedProfile) : {
            name: "",
            lastname: "",
            email: "",
            accountid: "",
            active: false,
        };
    });

    const updateProfile = (newProfileData) => {
        setProfile((prev) => {
            const updatedProfile = { ...prev, ...newProfileData };
            // Guardar en localStorage
            localStorage.setItem('profile', JSON.stringify(updatedProfile));
            return updatedProfile;
        });
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};