import axios from "../axios-orders";

export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL";
export const PURCHASE_BURGER_START = "PURCHASE_BURGER_START";
export const PURCHASE_INIT = "PURCHASE_INIT";

export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL";

export const purchaseBurgerSuccess = (id, order) => {
  return {
    type: PURCHASE_BURGER_SUCCESS,
    id,
    order
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: PURCHASE_BURGER_FAIL,
    error
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: PURCHASE_BURGER_START
  };
};

export const purchaseBurger = (order, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, order)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, order));
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const onPurchaseInit = () => {
  return {
    type: PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: FETCH_ORDERS_SUCCESS,
    orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: FETCH_ORDERS_FAIL,
    error
  };
};

export const fetchOrdersStart = () => {
  return {
    type: FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get("/orders.json" + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error));
      });
  };
};
