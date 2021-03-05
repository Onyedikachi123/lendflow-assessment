import axios from "axios";

const http = axios.create({
  baseURL: "https://api.hatchways.io"
});

export default http;
