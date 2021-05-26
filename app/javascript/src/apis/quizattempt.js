import axios from "axios";

const quizAttempt = {
  all: () => axios.get("/attempts"),
  create: payload => axios.post(`/attempts`, payload),
  update: (id, payload) => axios.put(`/attempts/${id}`, payload),
};

export default quizAttempt;
