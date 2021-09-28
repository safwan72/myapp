import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = useSelector(state=>state.token);

    return <Route
        {...rest}
        render={({location, ...children}) =>(token? <Component {...children} />: (
                <Redirect to={{
                    pathname: '/signup',
                    state: { from: location },
                }}/>
            ))
        }
    />;
};
export default PrivateRoute;