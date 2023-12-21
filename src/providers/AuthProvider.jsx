import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('id_token');
        if (token) {
            try {
                let user = JSON.parse(atob(token.split('.')[1]));
                setCurrentUser(user);
            } catch (e) {
                console.error('Token error:', e);
            }
        }

    }, []);

    const login = (token) => {
        localStorage.setItem('id_token', token);
        if (token) {
            try {
                let user = JSON.parse(atob(token.split('.')[1]));
                setCurrentUser(user);
                navigate('/');
            } catch (e) {
                console.error('Token error:', e);
            }
        }

    };

    const logout = () => {
        localStorage.removeItem('id_token');
        setCurrentUser(null);
        navigate('/');
    };

    const authContextValue = {
        currentUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};
