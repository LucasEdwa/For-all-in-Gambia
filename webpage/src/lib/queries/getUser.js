import { api } from "../axios";

export async function getUser() {
  try {
    const response = await api.get("/current-user");
    return response.data;
  } catch (error) {
    const message =
      error.response && error.response.status === 500
        ? "Server error. Please try again later."
        : "Error fetching user data";
    throw new Error(message);
  }
}
