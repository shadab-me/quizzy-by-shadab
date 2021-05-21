import axios from "axios";

const auth = {
  login: payload => axios.post("/sessions", payload),
  signup: payload => axios.post("/users", payload),
  logged: () => axios.get("/sessions"),
  logout: () => axios.delete("/sessions"),
};

export default auth;
