import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../providers/AuthProvider";

const CognitoRedirect = ( {children}) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    let cognitoDomain = import.meta.env?.VITE_COGNITO_DOMAIN ||
        'https://gamechat.auth.eu-north-1.amazoncognito.com';
    let cognitoClientId = import.meta.env?.VITE_COGNITO_CLIEND_ID || '72nem5u2o9v5t5ce8vpvgjq2uq';
    let cognitoRedirectUri =  import.meta.env?.VITE_COGNITO_REDIRECT_URL || 'https://www.sergeykamaltynov.link/protected';
    // let cognitoRedirectUri = 'http://localhost:5173/protected';

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
