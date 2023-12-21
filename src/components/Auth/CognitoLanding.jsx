import React, { useEffect } from 'react';
import {useAuth} from "../../providers/AuthProvider";

const ProtectedComponent = () => {
    const { currentUser, login } = useAuth();
    useEffect(() => {
        if (!currentUser) {
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.replace('#', '?'));

            if (params.has('error')) {
                const error = params.get('error');
                const errorDescription = params.get('error_description');
                console.log(error, errorDescription);
            } else if (params.has('id_token')) {
                const idToken = params.get('id_token');
                login(idToken);


            }
        }
    }, [currentUser, login]);

    return <div>Protected Content</div>;
};

export default ProtectedComponent;