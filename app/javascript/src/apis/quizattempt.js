import axios from "axios";

const quizAttempt = {
  create: payload => axios.post(`/attempts`, payload),
};

export default quizAttempt;
