import axios from "axios";

const report = {
  create: () => axios.post("/report"),
  getFile: () => axios.get("/report"),
};

export default report;
