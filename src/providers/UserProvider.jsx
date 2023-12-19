import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    let initialUser = {id: new Date().getTime(), name: `Admin ${new Date().getTime().toString().slice(-4)}`};
    const [currentUser, setCurrentUser] = useState(initialUser); 

    const setUser = (user) => {
        setCurrentUser(user);
    };

    return (
        <UserContext.Provider value={{currentUser, setUser}}>
            {children}
        </UserContext.Provider>
    );
};
