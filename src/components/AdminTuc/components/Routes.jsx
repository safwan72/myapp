import React from 'react'

import { Route, Switch } from 'react-router-dom'
import { Redirect, useRouteMatch } from "react-router";
import '@coreui/coreui/dist/css/coreui.min.css'
import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Products from '../pages/Products'
import Orders from '../pages/Orders'
import Categories from '../pages/Categories';
import Daytimes from '../pages/Daytimes';
import EditAdminOrder from './AddingModal/EditAdminOrder';

const Routes = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route path={`${path}/home`} exact component={Dashboard}/>
            <Route path={`${path}/customers`} exact component={Customers}/>
            <Route path={`${path}/dishes`} exact component={Products}/>
            <Route path={`${path}/orders`} exact component={Orders}/>
            <Route path={`${path}/orders/:id`} exact component={EditAdminOrder}/>
            <Route path={`${path}/category`} exact component={Categories}/>
            <Route path={`${path}/daytime`} exact component={Daytimes}/>
            <Redirect to={`${path}/home`}/>
        </Switch>
    )
}

export default Routes
