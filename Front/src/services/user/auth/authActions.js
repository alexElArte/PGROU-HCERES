import * as AT from "./authTypes";
import axios from "axios";
import authToken from "../../../utils/authToken";
import {API_URL} from "../../../constants";

const AUTH_URL = API_URL + "/user/authenticate";

export const authenticateUser = (login, password) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(AUTH_URL, {
      researcherLogin: login,
      researcherPassword: password,
    });
    localStorage.setItem("jwtToken", response.data.token);
    authToken(response.data.token)
    dispatch(success({ username: response.data.name, isLoggedIn: true }));
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch(failure());
    localStorage.removeItem("jwtToken");
    authToken('')
    return Promise.reject(error);
  }
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());
    localStorage.removeItem("jwtToken");
    dispatch(success({ username: "", isLoggedIn: false }));
  };
};

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
