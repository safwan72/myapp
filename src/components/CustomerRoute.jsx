import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
const CustomerRoute = ({ component: Component, ...rest }) => {
    const token =useSelector(state=>state.token);
    const customer = useSelector(state=>state.user_details?.role);
    return <Route
        {...rest}
        render={({location, ...children}) =>(token && customer==='Customer' ? <Component {...children} />: (
                <Redirect to={{
                    pathname: '/home',
                    state: { from: location },
                }}/>
            ))
        }
    />;
}

export default CustomerRoute;
