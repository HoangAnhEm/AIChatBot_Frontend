import axios from "axios";

const ApiManager = axios.create({
  baseURL: "https://your-api.com", // Replace with actual API URL
  timeout: 5000, // Optional: Set request timeout (in ms)
  headers: {
    "Content-Type": "application/json", // Set default headers
    "Accept": "application/json",
  },
});

export default ApiManager;
