import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData";
class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let totalPrice = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") totalPrice = param[1];
      else ingredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients,
      totalPrice
    });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const { ingredients, totalPrice } = this.state;
    const { match } = this.props;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={match.path + "/contact-data"}
          render={props => (
            <ContactData
              ingredients={ingredients}
              totalPrice={totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
