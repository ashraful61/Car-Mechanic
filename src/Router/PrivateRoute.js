import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const PrivateRoute = ({children}) => {
    const { user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <h3 className="text-3xl">Loading..</h3>
    }

    if(user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;