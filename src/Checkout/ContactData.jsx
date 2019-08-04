import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../axios-orders";

import Button from "../components/UI/Button/Button";
import Spinner from "../components/UI/Spinner/Spinner";
import Input from "../components/UI/Input";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";

import * as orderActions from "../Orders/OrdersActions";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCodee: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            {
              value: "fastest",
              displayName: "Fastest"
            },
            {
              value: "cheapest",
              displayName: "Cheapest"
            }
          ]
        },
        validation: {},
        value: "fastest",
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    const { ingredients, totalPrice, token } = this.props;
    const { orderForm } = this.state;

    const orderData = {};

    for (let key in orderForm) {
      orderData[key] = orderForm[key].value;
    }

    const order = {
      ingredients,
      totalPrice,
      orderData
    };
    this.props.onPurchaseBurger(order, token);
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputId) => {
    const orderForm = {
      ...this.state.orderForm
    };

    const updateFormElement = {
      ...this.state.orderForm[inputId]
    };

    updateFormElement.value = event.target.value;
    updateFormElement.valid = this.checkValidity(
      updateFormElement.value,
      updateFormElement.validation
    );
    updateFormElement.touched = true;
    orderForm[inputId] = updateFormElement;

    let formIsValid = true;
    for (let inputIdentifier in orderForm) {
      formIsValid = orderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm, formIsValid });
  };

  render() {
    const { orderForm, formIsValid } = this.state;
    const { loading } = this.props;

    const formElementArray = [];
    for (let key in orderForm) {
      formElementArray.push({
        id: key,
        config: orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(({ id, config }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            changed={event => this.inputChangedHandler(event, id)}
            invalid={!config.valid}
            touched={config.touched}
            shouldValidate={config.validation}
          />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (loading) form = <Spinner />;

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = ({ burgerBuilder, orders, auth }) => ({
  ingredients: burgerBuilder.ingredients,
  totalPrice: burgerBuilder.totalPrice,
  loading: orders.loading,
  token: auth.user.idToken
});

const mapDispatchToProps = dispatch => ({
  onPurchaseBurger: (order, token) =>
    dispatch(orderActions.purchaseBurger(order, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
