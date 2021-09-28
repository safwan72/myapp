import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
const StaffRoute = ({ component: Component, ...rest }) => {
    const token =useSelector(state=>state.token);
    const customer = useSelector(state=>state.user_details?.role);
    return <Route
        {...rest}
        render={({location, ...children}) =>(token && customer==='Employee' ? <Component {...children} />: (
                <Redirect to={{
                    pathname: '/home',
                    state: { from: location },
                }}/>
            ))
        }
    />;
}

export default StaffRoute
