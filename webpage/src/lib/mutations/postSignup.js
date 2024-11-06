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
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response data:', error.response.data);
      throw new Error(error.response.data.message || error.message);
    } else if (error.request) {
      throw new Error('No response received from server');
    } else {
      throw new Error(error.message);
    }
  }
}