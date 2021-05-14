import axios from "axios";

const quiz = {
  create: payload => axios.post("/quizzes", payload),
};

export default quiz;
