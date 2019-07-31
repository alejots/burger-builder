import React from "react";

import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/sign-up">Sign Up</NavigationItem>
  </ul>
);

export default navigationItems;
