import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "./CheckoutSummary";
import ContactData from "./ContactData";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const { match, ingredients, purchased } = this.props;

    let summary = <Redirect to="/" />;

    if (ingredients) {
      const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route path={match.path + "/contact-data"} component={ContactData} />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = ({ burgerBuilder, orders }) => ({
  ingredients: burgerBuilder.ingredients,
  purchased: orders.purchased
});

export default connect(mapStateToProps)(Checkout);
