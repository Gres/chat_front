import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({id:1, name:'Admin'});


    const setUser = (user) => {
        setCurrentUser(user);
    };

    return (
        <UserContext.Provider value={{ currentUser, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
