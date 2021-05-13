import axios from "axios";

const auth = {
  login: payload => axios.post("/sessions", payload),
  signup: payload => axios.post("/users", payload),
  logged: () => axios.get("/logged"),
  logout: () => axios.get("/logout"),
};

export default auth;
