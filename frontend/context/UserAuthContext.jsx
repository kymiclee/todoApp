import React, { createContext, useContext, useState } from 'react';

// Create a context to manage authentication state
export const UserAuthContext = createContext();

// Custom hook to access authentication context
export const useAuth = () => useContext(UserAuthContext);

// AuthProvider component to manage authentication state
export const UserAuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        // Perform login logic (e.g., authenticate user with Passport.js)
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Perform logout logic (e.g., clear authentication state)
        setIsAuthenticated(false)
    };

    return (
        <UserAuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </UserAuthContext.Provider>
    );
};

// Example usage:
// Wrap your application with AuthProvider
// <AuthProvider>
//   <App />
// </AuthProvider>

// In any component, use the useAuth hook to access authentication state and methods
// const { isAuthenticated, login, logout } = useAuth();
// Then, conditionally render components or perform actions based on isAuthenticated
