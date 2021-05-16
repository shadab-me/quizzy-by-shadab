import axios from "axios";

const quiz = {
  all: () => axios.get("/quizzes"),
  create: payload => axios.post("/quizzes", payload),
  delete: id => axios.delete(`/quizzes/${id}`),
};

export default quiz;
