import React, { Component } from "react";
import { Route } from "react-router-dom";
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
    const { match, ingredients } = this.props;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={match.path + "/contact-data"} component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ ingredients: state.ingredients });

export default connect(mapStateToProps)(Checkout);
