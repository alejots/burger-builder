import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./BurgerBuilder/BurgerBuilder";
import Checkout from "./Checkout/Checkout";
import Orders from "./Orders/Orders";
import Auth from "./Auth/Auth";
import AuthLogout from "./Auth/AuthLogout";
import * as AuthActions from "./Auth/AuthActions";

class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/sign-up" component={Auth} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={AuthLogout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authCheckState: () => dispatch(AuthActions.authCheckState())
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
