import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "./BurgerIngridient.module.css";

class BurgerIngridient extends Component {
  render() {
    let ingridient = null;
    const { type } = this.props;

    if (type === "bread-bottom")
      ingridient = <div className={classes.BreadBottom} />;
    else if (type === "bread-top")
      ingridient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1} />
          <div className={classes.Seeds2} />
        </div>
      );
    else if (type === "meat") ingridient = <div className={classes.Meat} />;
    else if (type === "cheese") ingridient = <div className={classes.Cheese} />;
    else if (type === "bacon") ingridient = <div className={classes.Bacon} />;
    else if (type === "salad") ingridient = <div className={classes.Salad} />;

    return ingridient;
  }
}

BurgerIngridient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngridient;
