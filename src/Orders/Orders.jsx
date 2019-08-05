import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchOrders } from "./OrdersActions";

import axios from "../axios-orders";

import Order from "./Order";
import Spinner from "../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  componentDidMount() {
    const { token, userId } = this.props;
    this.props.fetchOrders(token, userId);
  }
  render() {
    const { orders, loading } = this.props;

    if (loading) return <Spinner />;

    return (
      <div>
        {orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.totalPrice}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ orders, auth }) => ({
  orders: orders.orders,
  loading: orders.loading,
  token: auth.user.idToken,
  userId: auth.user.localId
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
