import api from "../axios";

export const postPaymentIntent = async (variables) => {
  try {
    const response = await api.post("/donate", variables);

    return response.data;
  } catch (error) {
    console.error("Error response:", error.response);
    throw new Error(
      error.response?.data?.message || error.message || "Unknown error"
    );
  }
};
