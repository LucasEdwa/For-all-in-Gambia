import api from "../axios";

export default async function PostSignIn({ email, password }) {
  try {
    const response = await api.post("/sign-in", { email, password });
    const token = response.data.token; // Extract the token from the response data
    if (token) {
      localStorage.setItem("token", token); // Save the token to local storage
    } else {
      console.error("No token in response data:", response.data); // Log an error if there's no token
    }
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      throw error;
    }
  }
}
