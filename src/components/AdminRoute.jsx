import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
const AdminRoute = ({ component: Component, ...rest }) => {
    const token =useSelector(state=>state.token);
    const isAdmin = useSelector(state=>state.user_details?.isAdmin);
    return <Route
        {...rest}
        render={({location, ...children}) =>(token && isAdmin ? <Component {...children} />: (
                <Redirect to={{
                    pathname: '/home',
                    state: { from: location },
                }}/>
            ))
        }
    />;
}

export default AdminRoute;
