import { useContext } from 'react';
import { ProfileContext } from '../context/profileContext';
import { useEffect } from 'react';

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    
    const { profile, reloadProfileFromStorage } = context;

    // Recargar desde localStorage si profile está vacío
    useEffect(() => {
        if (!profile || Object.keys(profile).length === 0) {
            reloadProfileFromStorage();
        }
    }, [profile, reloadProfileFromStorage]);

    return context;
};