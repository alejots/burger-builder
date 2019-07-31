import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../axios-orders";

import * as AuthActions from "./AuthActions";

import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button/Button";
import Spinner from "../components/UI/Spinner/Spinner";

import classes from "./Auth.module.css";

class Auth extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };

  signUpHandler = event => {
    event.preventDefault();
    const { loginForm, isSignUp } = this.state;

    const user = {
      email: loginForm.email.value,
      password: loginForm.password.value
    };
    this.props.onSignUp(user, isSignUp ? "signUp" : "signInWithPassword");
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
    const loginForm = {
      ...this.state.loginForm
    };

    const updateFormElement = {
      ...this.state.loginForm[inputId],
      value: event.target.value,
      valid: this.checkValidity(
        event.target.value,
        loginForm[inputId].validation
      ),
      touched: true
    };

    loginForm[inputId] = updateFormElement;

    let formIsValid = true;
    for (let inputIdentifier in loginForm) {
      formIsValid = loginForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ loginForm, formIsValid });
  };

  changeModeHandler = () => {
    const isSignUp = !this.state.isSignUp;
    this.setState({ isSignUp });
  };

  render() {
    const { loginForm, formIsValid, isSignUp } = this.state;
    const { loading } = this.props;

    const formElementArray = [];
    for (let key in loginForm) {
      formElementArray.push({
        id: key,
        config: loginForm[key]
      });
    }

    if (loading) return <Spinner />;

    return (
      <div className={classes.Auth}>
        <h4>Enter your credentials</h4>
        <form onSubmit={this.signUpHandler}>
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
            SUBMIT
          </Button>
        </form>
        <Button btnType="Danger" clicked={this.changeModeHandler}>
          Switch to {isSignUp ? "Login" : "Sign Up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading
});

const mapDispatchToProps = dispatch => ({
  onSignUp: (user, type) => dispatch(AuthActions.auth(user, type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, axios));
