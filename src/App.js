import "./App.css";
import React, { Component } from "react";
import { Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import Orders from "./pages/Orders/Orders";
import SingleOrder from "./pages/SingleOrder/SingleOrder";
import Showcase from "./pages/Showcase/Showcase";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Form from "./pages/Form/Form";

class App extends Component {
  state = {
    colors: ["Blue", "White", "Black"],
    washings: [1, 2, 3],
    sizeType: ["C", "N"],
    shipmentOptions: [
      "Confirmed",
      "Ready for shipping",
      "Shipped",
      "Received",
      "Rejected",
    ],
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path={process.env.PUBLIC_URL + "/"}
          component={() => <Homepage />}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/Orders"}
          component={() => <Orders />}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/Products"}
          component={() => <Products />}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/Categories"}
          component={() => <Categories />}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/Showcase"}
          component={() => <Showcase />}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + `/Orders/SingleOrder/:id`}
          component={() => (
            <SingleOrder shipmentOptions={this.state.shipmentOptions} />
          )}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + `/Add/:type`}
          component={() => (
            <Form
              sizeType={this.state.sizeType}
              colors={this.state.colors}
              sizes={this.state.sizes}
              washings={this.state.washings}
            />
          )}
        />
        <Route
          exact
          path={process.env.PUBLIC_URL + `/Edit/:type/:id`}
          component={() => (
            <Form
              sizeType={this.state.sizeType}
              colors={this.state.colors}
              sizes={this.state.sizes}
              washings={this.state.washings}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default App;
