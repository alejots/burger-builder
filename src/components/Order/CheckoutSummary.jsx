import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";

import classes from "./CheckoutSummary.module.css";

const checkoutSummary = props => {
  const { ingredients } = props;

  return (
    <div className={classes.checkoutSummary}>
      <h1>We hope it tasts well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={ingredients} />
      </div>
      <Button btnType="Danger" clicked>
        CANCEL
      </Button>
      <Button btnType="Success" clicked>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
