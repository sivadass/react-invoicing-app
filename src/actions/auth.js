import { push } from "connected-react-router";
import Service from "../utils/service";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER
} from "./index";

export const requestLogin = credentials => ({
  type: LOGIN_REQUEST,
  isLoading: true,
  isAuthenticated: false,
  payload: credentials
});

export const receiveLogin = userData => ({
  type: LOGIN_SUCCESS,
  isLoading: false,
  isAuthenticated: true,
  payload: userData
});

export const loginError = message => ({
  isLoading: false,
  isAuthenticated: false,
  type: LOGIN_FAILURE,
  payload: message
});

export const logout = () => ({
  type: LOGOUT_USER,
  isAuthenticated: false
});

export function loginUser(credentials) {
  return dispatch => {
    dispatch(requestLogin());
    Service.post(`${SERVICE_URL}/Users/login`, credentials, (status, data) => {
      if (status === 200) {
        dispatch(receiveLogin(data));
        dispatch(push("/"));
      } else if (status == 400) {
        dispatch(loginError(data));
      }
    });
  };
}

export function logoutUser() {
  return dispatch => {
    Service.post(`${SERVICE_URL}/Users/logout`, null, (status, data) => {
      if (status === 204) {
        dispatch(logout());
      } else if (status == 400) {
        console.log(data);
      }
    });
  };
}
