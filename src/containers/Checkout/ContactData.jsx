import React, { Component } from "react";

import axios from "../../axios-orders";

import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./ContactData.module.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    const { ingredients, totalPrice, history } = this.props;

    this.setState({ loading: true });
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      customer: {
        name: "Alejandro Tunaroza",
        address: {
          street: "Feak Street 123",
          zipCodee: "1010",
          country: "New Zealand"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
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

  render() {
    const { loading } = this.state;
    let form = (
      <form>
        <input type="text" name="name" placeholder="Your name" />
        <input type="email" name="email" placeholder="Your email" />
        <input type="text" name="street" placeholder="Street" />
        <input type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>
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

export default ContactData;
