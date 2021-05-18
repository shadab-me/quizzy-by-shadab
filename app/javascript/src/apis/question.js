import axios from "axios";

const quiz = {
  all: () => axios.get("/questions"),
  one: id => axios.get(`/questions/${id}`),
  create: payload => axios.post("/questions", payload),
  delete: id => axios.delete(`/questions/${id}`),
  update: (id, payload) => axios.put(`/questions/${id}`, payload),
};

export default quiz;
