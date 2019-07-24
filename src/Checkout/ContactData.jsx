import React, { Component } from "react";

import axios from "../axios-orders";

import Button from "../components/UI/Button/Button";
import Spinner from "../components/UI/Spinner/Spinner";
import Input from "../components/UI/Input";

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
        valid: false
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
        valid: false
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
        valid: false
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
        valid: false
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
        valid: false
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
        value: ""
      }
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    const { ingredients, totalPrice, history } = this.props;
    const { orderForm } = this.state;
    this.setState({ loading: true });

    const orderData = {};

    for (let key in orderForm) {
      orderData[key] = orderForm[key].value;
    }

    const order = {
      ingredients,
      totalPrice,
      orderData
    };
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  checkValidity(value, rules) {
    let isValid = true;

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
    orderForm[inputId] = updateFormElement;
    console.log(updateFormElement);
    this.setState({ orderForm });
  };

  render() {
    const { loading, orderForm } = this.state;

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
          />
        ))}
        <Button btnType="Success">ORDER</Button>
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

export default ContactData;
