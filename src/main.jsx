import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {AuthProvider} from "./providers/AuthProvider";
import CognitoRedirect from "./components/Auth/CognitoRedirect";
import CognitoLanding from "./components/Auth/CognitoLanding";
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<CognitoRedirect><App/></CognitoRedirect>}/>
                    <Route path="/protected" element={<CognitoLanding />}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
