import api from "../axios";
export default async function PostSignUp({
  email,
  password,
  password_confirmation,
  firstName,
  lastName,
  marketing_accept,
}) {
  try {
    const response = await api.post("/sign-up", {
      email,
      password,
      password_confirmation,
      firstName,
      lastName,
      marketing_accept,
    });
    return response.data;
  } catch (error) {
    throw new Error("An error occurred. Please try again later.");
  }
}
