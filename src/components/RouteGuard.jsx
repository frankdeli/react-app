import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/TokenUtils'
import { jwtDecode } from 'jwt-decode';

const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
};

const RouteGuard = ({ element: Component }) => {
    const token = getToken();
    const hasValidToken = token && !isTokenExpired(token);

    return hasValidToken ? <Component /> : <Navigate to="/login" />;
};

export default RouteGuard;