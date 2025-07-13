import axios from "axios";

const api = axios.create({
  baseURL: "/api/testapi",
  headers: {
    Authorization: "Bearer test_saharasadii",
  },
});

export default api;
