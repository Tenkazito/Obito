import { useState, useEffect } from "react";
import { ProfileContext } from "./profileContext";

export const ProfileProvider = ({ children }) => {
    // Función para cargar datos desde localStorage
    const loadFromStorage = () => {
        try {
            const savedProfile = localStorage.getItem('profile');
            return savedProfile ? JSON.parse(savedProfile) : {
                name: "",
                lastname: "",
                email: "",
                accountid: "",
                active: false,
            };
        } catch (error) {
            console.error("Error al cargar el perfil desde localStorage:", error);
            return {
                name: "",
                lastname: "",
                email: "",
                accountid: "",
                active: false,
            };
        }
    };

    const [profile, setProfile] = useState(loadFromStorage);

    // Sincronizar profile con localStorage cada vez que cambie
    useEffect(() => {
        try {
            localStorage.setItem('profile', JSON.stringify(profile));
        } catch (error) {
            console.error("Error al guardar el perfil en localStorage:", error);
        }
    }, [profile]);

    // Verificar al montar si profile está vacío y recargar desde localStorage
    useEffect(() => {
        const storedProfile = loadFromStorage();
        // Usar el setter de useState con una función para comparar el estado actual
        setProfile((currentProfile) => {
            if (!currentProfile || Object.keys(currentProfile).length === 0) {
                return storedProfile;
            }
            return currentProfile;
        });
    }, []);

    const updateProfile = (newProfileData) => {
        setProfile((prev) => {
            const updatedProfile = { ...prev, ...newProfileData };
            return updatedProfile;
        });
    };

    // Función para recargar manualmente desde localStorage
    const reloadProfileFromStorage = () => {
        setProfile(loadFromStorage());
    };

    return (
        <ProfileContext.Provider value={{ profile, updateProfile, reloadProfileFromStorage }}>
            {children}
        </ProfileContext.Provider>
    );
};