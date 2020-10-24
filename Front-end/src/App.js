import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Order from "./Order";
import ProductByCategory from "./product/ProductByCategory";
import SearchProduct from "./product/SearchProduct";
import OrderTracking from "./OrderTracking"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Category from "./Category";

function App() {
  function SecureRoute(props) {
    let token = window.localStorage.getItem("token");
  return (
      <Route
        path={props.path}
        render={() => {
          if (token) return <props.component />;
          else return <Redirect to={{ pathname: "/login" }} />;
        }}
      ></Route>
    );
  }
   function ConnectRoute(props) { 
    let token = window.localStorage.getItem("token");
    return (
      <Route
        path={props.path}
         render={() => {
          if (token) {
            console.log("heyyy")
            window.localStorage.removeItem("token");
    window.localStorage.removeItem("firstName");
    return <Redirect to={{ pathname: "/" }} />}
          else  {return <props.component />};
        }}
      ></Route>
    );
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <ConnectRoute path="/login" exact component={Login}></ConnectRoute>

          <SecureRoute
            path="/order" exact component={Order}
          />
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/:cat" exact>
            <Header />
            <Category/>
            <ProductByCategory />
          </Route>
          <Route path="/search/:id" exact>
            <Header />
            <SearchProduct />
          </Route>
          <Route path="/order/tracking" exact>
            <Header></Header>
            <OrderTracking />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
