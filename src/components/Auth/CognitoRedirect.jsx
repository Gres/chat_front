import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../providers/AuthProvider";

const CognitoRedirect = ( {children}) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    let cognitoDomain = 'https://gamechat.auth.eu-north-1.amazoncognito.com';
    let cognitoClientId = '72nem5u2o9v5t5ce8vpvgjq2uq';
    let cognitoRedirectUri = 'http://localhost:5173/protected';

    const cognitoUrl =`${cognitoDomain}/login?response_type=token&client_id=${cognitoClientId}&redirect_uri=${cognitoRedirectUri}`;
    useEffect(() => {
        const token = localStorage.getItem('id_token');
        if (!token) {
            window.location.href = cognitoUrl;
        }

    }, [navigate]);


    return <div> {children}</div>;
};

export default CognitoRedirect;
