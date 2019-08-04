import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "./Burger";
import BuildControls from "./BuildControls";
import Modal from "../components/UI/Modal/Modal";
import OrderSummary from "../Orders/OrderSummary";
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import axios from "../axios-orders";

import * as BurgerBuilderActions from "./BurgerBuilderActions";
import * as OrdersActions from "../Orders/OrdersActions";
import * as AuthAction from "../Auth/AuthActions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  isPurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/sign-up");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  render() {
    const { purchasing } = this.state;
    const {
      ingredients,
      totalPrice,
      error,
      onIngredientAdded,
      onIngredientRemoved,
      isAuthenticated
    } = this.props;

    const disabledInfo = {
      ...ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = error ? <p>the ingredients can't be loaded! </p> : <Spinner />;

    if (ingredients) {
      burger = (
        <React.Fragment>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            price={totalPrice}
            purchasable={this.isPurchasable(ingredients)}
            ordered={this.purchaseHandler}
            isAuthenticated={isAuthenticated}
          />
        </React.Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <React.Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ burgerBuilder, auth }) => ({
  ingredients: burgerBuilder.ingredients,
  totalPrice: burgerBuilder.totalPrice,
  error: burgerBuilder.error,
  isAuthenticated: auth.user.idToken ? true : false
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingredientName =>
    dispatch(BurgerBuilderActions.addIngredient(ingredientName)),
  onIngredientRemoved: ingredientName =>
    dispatch(BurgerBuilderActions.removeIngredient(ingredientName)),
  onInitIngredients: () => dispatch(BurgerBuilderActions.initIngredients()),
  onPurchaseInit: () => dispatch(OrdersActions.onPurchaseInit()),
  onSetAuthRedirectPath: path => dispatch(AuthAction.setAuthRedirectPath(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
