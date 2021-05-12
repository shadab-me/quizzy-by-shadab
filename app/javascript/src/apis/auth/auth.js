import axios from "axios";

const auth = {
  login: payload => axios.post("/sessions", payload),
  signup: payload => axios.post("/users", payload),
};

export default auth;
