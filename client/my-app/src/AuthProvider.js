import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Try to get user data from local storage
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));  // Save user data to local storage
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');  // Remove user data from local storage
        setUser(null);
    };

    useEffect(() => {
        // Optionally add more effects on user change or check token validity
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
