import React from "react";

import classes from "./NavigationItems.module.css";

import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  console.log(props.user);
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {props.user.localId ? (
        (<NavigationItem link="/orders">Orders</NavigationItem>,
        <NavigationItem link="/logout">Logout</NavigationItem>)
      ) : (
        <NavigationItem link="/sign-up">Auth</NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
