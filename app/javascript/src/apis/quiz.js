import axios from "axios";

const quiz = {
  all: () => axios.get("/quizzes"),
  one: () => axios.get(`/quizzes/${id}`),
  create: payload => axios.post("/quizzes", payload),
  delete: id => axios.delete(`/quizzes/${id}`),
  update: id => axios.put(`/quizzes/${id}`),
};

export default quiz;
