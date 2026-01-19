import axios from "axios";
import {API_URL} from "../constants";

const authToken = (token) => {
  axios.defaults.baseURL = API_URL;
  if (token) {
    axios.defaults.headers.common["Authorization"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default authToken;
