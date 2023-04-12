import React from "react";
import { Switch, Route } from "react-router-dom";
import GuestRoute from "../routing/GuestRoute";
import PrivateRoute from "../routing/PrivateRoute";
import Menu from "../menu/Menu";
import Tray from "../tray/Tray";
import AdminLogin from "../auth/AdminLogin";
import AdminDashboard from "../layout/Dashboard";
import NotFound from "../layout/NotFound";
import Order from "../orders/Order";
import Account from "../admin/Account";
import Dishes from "../dish/Dishes";
import EditDish from "../dish/EditDish";
import AddDish from "../dish/AddDish";
import Categories from "../category/Categories";
import AddCategory from "../category/AddCategory";
import EditCategory from "../category/EditCategory";
import Restaurant from "../admin/Restaurant";

const Routes = () => {
  return (
    <div>
      <Switch>
        <GuestRoute exact path="/catalog" component={Menu} />
        <GuestRoute exact path="/cart" component={Tray} />
        <Route exact path="/admin" component={AdminLogin} />
        <PrivateRoute
          exact
          path="/admin/dashboard"
          component={AdminDashboard}
        />
        <PrivateRoute exact path="/admin/orders" component={Order} />
        <PrivateRoute exact path="/admin/products" component={Dishes} />
        <PrivateRoute
          exact
          path="/admin/products/edit/:id"
          component={EditDish}
        />
        <PrivateRoute exact path="/admin/products/add" component={AddDish} />
        <PrivateRoute exact path="/admin/categories" component={Categories} />
        <PrivateRoute
          exact
          path="/admin/categories/edit/:id"
          component={EditCategory}
        />
        <PrivateRoute
          exact
          path="/admin/categories/add"
          component={AddCategory}
        />
        <PrivateRoute exact path="/admin/account" component={Account} />
        {/* <PrivateRoute exact path='/admin/store' component={Restaurant} /> */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

Routes.propTypes = {};

export default Routes;
