import axios from "axios";

// Define the API base URL
const API_BASE_URL = "https://localhost:7056/api";

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login function (Fixed: Uses axios instead of fetch)
export const loginUser = async ({ Email, Password }) => {
  try {
      const response = await axios.post("https://localhost:7056/api/Auth/Login", { Email, Password });
      return response.data;
  } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw error;
  }
};
// Register function
export const registerUser = async (formDataToSend) => {
  try {
    const response = await api.post("/User", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
