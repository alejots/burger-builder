import React from "react";

import classes from "./Input.module.css";

const Input = props => {
  const { label, elementType, elementConfig, value, changed } = props;

  let inputElement = null;

  switch (elementType) {
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={classes.InputElement}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayName}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
