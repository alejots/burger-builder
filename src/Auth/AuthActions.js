import axios from "axios";

import { API_KEY } from "../keys";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";

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

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
        localStorage.setItem("user", JSON.stringify(res.data));
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(res.data));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(error => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    const expirationDate = new Date(localStorage.getItem("expirationDate"));

    if (!user) {
      dispatch(logout());
    } else {
      if (expirationDate > new Date()) {
        dispatch(authSuccess(user));

        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
