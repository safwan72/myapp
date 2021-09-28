import React from "react";
import { Switch, Redirect } from "react-router";
import Signup from "../Auth/Signup";
import Home from "./Home/Home";
import Logout from "../Auth/Logout";
import Index from "../AdminTuc/Index";
import PrivateRoute from "../PrivateRoutes";
import AdminRoute from "../AdminRoute";
import PublicRoute from "../PublicRoute";
import './Home/Header/nav.css'
import About from "./Main/About/About";
import Menu from "./Main/Menu/Menu";
import Contact from "./Main/Contact/Contact";
import MenuDetails from "./Main/Menu/MenuDetails";
import Cart from "./Main/Cart/Cart";
import CustomerRoute from "../CustomerRoute";
import StaffRoute from "../StaffRoute";
import Delivery from "./Main/Delivery/Delivery";
import CustomerOrders from "./Main/Orders/CustomerOrders";
import Confirmation from "./Main/Confirmation";
import StaffOrders from "../Staff/StaffOrders";
import Profile from "./Profile/Profile";
import StaffPrevious from "../Staff/StaffPrevious";
const Routes = () => {
  return (
    <>
      <Switch>
        <PublicRoute restricted={false} path="/home" exact component={Home} />
        <AdminRoute path="/admin"  component={Index} />
        <CustomerRoute path="/cart" component={Cart} />
        <CustomerRoute path="/myorders" component={CustomerOrders} />
        <CustomerRoute path="/delivery" component={Delivery} />
        <StaffRoute path="/stafforders" component={StaffOrders} />
        <StaffRoute path="/staffpreviousorders" component={StaffPrevious} />
        <PublicRoute path="/confirmation/:id" restricted={false} component={Confirmation} />
        <PrivateRoute path="/logout" component={Logout} />
        <PrivateRoute path="/profile" component={Profile} />
        <PublicRoute path="/about" restricted={false} component={About} />
        <PrivateRoute path="/menu" component={Menu} />
        <PrivateRoute path="/dish/:id" component={MenuDetails} />
        <PublicRoute path="/contact" restricted={false} component={Contact} />
        <PublicRoute
          path="/signup"
          restricted={true}
          exact
          component={Signup}
        />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
};

export default Routes;
