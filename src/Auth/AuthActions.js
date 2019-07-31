import axios from "axios";

import { API_KEY } from "../keys";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const authSuccess = data => {
  return {
    type: AUTH_SUCCESS,
    data
  };
};

export const authFail = error => {
  return {
    type: AUTH_FAIL,
    error
  };
};

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const auth = (user, type) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${type}?key=${API_KEY}`,
        { ...user, returnSecureToken: true }
      )
      .then(res => {
        dispatch(authSuccess(res.data));
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};
