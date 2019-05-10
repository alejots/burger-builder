import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    console.log(ingredients);
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({
      purchasable: sum > 0
    });
  }

  addIngredientHandler = type => {
    const ingredients = {
      ...this.state.ingredients
    };

    ingredients[type] = this.state.ingredients[type] + 1;
    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState({ totalPrice, ingredients });
    this.updatePurchaseState(ingredients);
  };

  removeIngredientHandler = type => {
    const ingredients = {
      ...this.state.ingredients
    };

    if (ingredients[type] <= 0) return;

    ingredients[type] = this.state.ingredients[type] - 1;
    const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState({ ingredients, totalPrice });
    this.updatePurchaseState(ingredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("You Continue!");
  };

  render() {
    const { ingredients, totalPrice, purchasable } = this.state;
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={!purchasable}
          ordered={this.purchaseHandler}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
