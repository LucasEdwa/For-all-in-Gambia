import api from "../axios";

export async function postDonation({
  email,
  donationType,
  signatureType,
  donationAmount,
  customDonationAmount,
  checkedForTaxReduction,
}) {
  try {
    const response = await api.post("/donate", {
      email,
      donationType,
      signatureType,
      donationAmount,
      customDonationAmount,
      checkedForTaxReduction,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
