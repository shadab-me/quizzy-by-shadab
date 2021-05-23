import axios from "axios";

const publicData = {
  create: (id, payload) => axios.post(`/public/${id}`, payload),
};

export default publicData;
