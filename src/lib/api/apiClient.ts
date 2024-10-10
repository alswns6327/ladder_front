import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Authorization: "Bearer ".concat(
      localStorage.getItem("accessToken") as string
    ),
  },
});

export default apiClient;
