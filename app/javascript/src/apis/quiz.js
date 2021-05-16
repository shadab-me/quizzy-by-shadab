import axios from "axios";

const quiz = {
  all: () => axios.get("/quizzes"),
  one: id => axios.get(`/quizzes/${id}`),
  create: payload => axios.post("/quizzes", payload),
  delete: id => axios.delete(`/quizzes/${id}`),
  update: (id, payload) => axios.put(`/quizzes/${id}`, payload),
};

export default quiz;
