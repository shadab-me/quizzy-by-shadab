import axios from "axios";

const quiz = {
  all: () => axios.get("/quizzes"),
  create: payload => axios.post("/quizzes", payload),
};

export default quiz;
