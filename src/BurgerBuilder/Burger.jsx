import React from "react";

import BurgerIngridient from "./BurgerIngridient";

import classes from "./Burger.module.css";

const Burger = props => {
  const { ingredients } = props;

  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
      return [...Array(ingredients[igKey])].map((_, i) => {
        return <BurgerIngridient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0)
    transformedIngredients = <p>Please start adding ingredients!</p>;

  return (
    <div className={classes.Burger}>
      <BurgerIngridient type="bread-top" />
      {transformedIngredients}
      <BurgerIngridient type="bread-bottom" />
    </div>
  );
};

export default Burger;
