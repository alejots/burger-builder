import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";
import Orders from "./Orders/Orders";
import Auth from "./Auth/Auth";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/sign-up" component={Auth} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
