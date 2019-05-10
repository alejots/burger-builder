import React, { Component } from "react";

import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.props.show);
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate() {
    console.log("[Modal.jsx] Did Update");
  }
  render() {
    return (
      <React.Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translate(-100vh)",
            opacity: this.props.show ? 1 : 0
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
