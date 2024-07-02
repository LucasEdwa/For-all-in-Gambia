import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postPaymentIntent } from "../lib/mutations/postPaymentIntent";
import { getUser } from "../lib/queries/getUser";

import swishLogo from "../images/swish.png";
import visaLogo from "../images/visa.jpg";
import masterLogo from "../images/master.png";
import maestroLogo from "../images/maestro.png";

function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const {
    donationAmount,
    email,
    mobileNumber,
    donationType,
    signatureType,
    personalNumber,
    fullName,
    companyFirstName,
    companyLastName,
    companyEmail,
    companyMobileNumber,
    companyRegistrationNumber,
    checkedForTaxReduction,
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("swish");

  const mutate = useMutation({
    mutationFn: postPaymentIntent,
    onSuccess: (data) => {
      if (data.requiresAction) {
        stripe
          .confirmCardPayment(data.paymentIntentClientSecret)
          .then((result) => {
            if (result.error) {
              Swal.fire({
                title: "Något gick fel!",
                text: result.error.message,
                icon: "error",
                confirmButtonText: "OK",
              });
            } else if (result.paymentIntent.status === "succeeded") {
              Swal.fire({
                title: "Tack för din donation!",
                text: "Din donation har genomförts.",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                navigate("/");
              });
            }
          });
      } else {
        Swal.fire({
          title: "Tack för din donation!",
          text: "Din donation har genomförts.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      }
    },
    onError: (error) => {
      console.error("Error response:", error.response);
      Swal.fire({
        title: "Något gick fel!",
        text: error.response.data.error,
        icon: "error",
        confirmButtonText: "OK",
      });
    },
  });

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let paymentMethodId;

    if (paymentMethod === "card") {
      const cardElement = elements.getElement(CardElement);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        Swal.fire({
          title: "Något gick fel!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      paymentMethodId = paymentMethod.id;
    }
    console.log("userId", user.user?.id);

    // Validate required fields
    if (
      !donationType ||
      !signatureType ||
      isNaN(donationAmount) ||
      donationAmount <= 0 ||
      !fullName ||
      !email ||
      (paymentMethod === "card" && !paymentMethodId)
    ) {
      Swal.fire({
        title: "Något gick fel!",
        text: "Vänligen fyll i alla obligatoriska fält korrekt.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const variables = {
      donationType,
      signatureType,
      donationAmount: parseInt(donationAmount, 10),
      fullName,
      email,
      mobileNumber,
      personalNumber,
      companyFirstName: companyFirstName || "",
      companyLastName: companyLastName || "",
      companyRegistrationNumber: companyRegistrationNumber || "",
      companyEmail: companyEmail || "",
      companyMobileNumber: companyMobileNumber || "",
      paymentMethodId,
      checkedForTaxReduction: !!checkedForTaxReduction,
      userId: user.user?.id, // Add userId to variables
    };

    mutate.mutate(variables);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-12 p-5 shadow-lg font-sans">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <input
                type="radio"
                value="swish"
                checked={paymentMethod === "swish"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <span>Swish</span>
            </div>
            <div>
              <img src={swishLogo} alt="Swish logo" className="w-8" />
            </div>
          </label>
          <label className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <span>Kort</span>
            </div>
            <div className="flex">
              <img src={visaLogo} alt="Visa logo" className="w-8 mr-2" />
              <img
                src={masterLogo}
                alt="Mastercard logo"
                className="w-8 mr-2"
              />
              <img src={maestroLogo} alt="Maestro logo" className="w-8" />
            </div>
          </label>
        </div>

        {paymentMethod === "swish" && (
          <div className="mb-5">
            <input
              type="text"
              placeholder="(+46) 723451234"
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
        )}

        {paymentMethod === "card" && (
          <div className="mb-5">
            <CardElement options={{ style: { base: { fontSize: "18px" } } }} />
            <div className="mt-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Kom ihåg mitt kort
              </label>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded mt-2 hover:bg-blue-700 transition-colors"
        >
          Betala {donationAmount} KR
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;
