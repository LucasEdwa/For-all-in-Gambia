import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const generateDonationMessage = (amount, amountMessage) =>
  `Varje månad kan dina ${amount} kr ${amountMessage}. Som Världsförälder är du med och ger alla i Gambia hopp att forsätta.`;

const donationMessages = {
  "100 KR": generateDonationMessage(
    "100",
    "Du kan stödja mödrar i Gambia: Tillhandahåller prisvärda blöjor"
  ),
  "200 KR": generateDonationMessage(
    "200",
    "ge en mamma 800g mjölkpulver och en nappflaska"
  ),
  "400 KR": generateDonationMessage(
    "400",
    "ge en mamma 800g mjölkpulver och en nappflaska"
  ),
  VALFRITT: generateDonationMessage("valfria"),
};

const DonationAmountOptions = ({
  donationAmount,
  handleDonationAmountClick,
}) => (
  <div className="flex gap-1 mt-1">
    {["100 KR", "200 KR", "400 KR", "VALFRITT"].map((amount) => (
      <input
        key={amount}
        type="button"
        className={`p-2 border-2 text-center w-full cursor-pointer ${
          donationAmount === amount ? "bg-blue-700 " : "bg-transparent"
        }`}
        value={amount}
        onClick={() => handleDonationAmountClick(amount)}
      />
    ))}
  </div>
);

export default function PrivateDonationForm({ formData, setFormData }) {
  const [signatureType, setSignatureType] = useState("bli-manadsgivare");
  const [donationAmount, setDonationAmount] = useState("100 KR");
  const [customDonationAmount, setCustomDonationAmount] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      checkedForTaxReduction: event.target.checked,
    });
  };

  const validatePrivatePersonForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Email is required";
    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile number is required";
    if (formData.checkedForTaxReduction && !formData.personalNumber) {
      errors.personalNumber = "Personal number is required for tax reduction";
    }
    return errors;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const errors = validatePrivatePersonForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      const numericDonationAmount =
        donationAmount === "VALFRITT"
          ? customDonationAmount || "0"
          : parseInt(donationAmount.replace(" KR", ""), 10);
      setFormData({
        ...formData,
        donationAmount: numericDonationAmount,
        signatureType,
      });
      navigate("/payment", {
        state: {
          ...formData,
          donationAmount: numericDonationAmount,
          signatureType,
          donationType: "privat-person",
        },
      });
    }
  };

  const handleButtonClick = (button) => {
    setSignatureType(button);
  };

  const handleDonationAmountClick = (amount) => {
    setDonationAmount(amount);
    if (amount === "VALFRITT") {
      setCustomDonationAmount("");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md mx-auto px-5 pb-5 shadow-md "
      >
        <div className="">
          <div className="flex w-full">
            <input
              type="button"
              className={`w-full p-2 border-2 text-center cursor-pointer ${
                signatureType === "bli-manadsgivare"
                  ? "bg-blue-700 border-none"
                  : "bg-transparent"
              }`}
              value="BLI MÅNADSGIVARE"
              onClick={() => handleButtonClick("bli-manadsgivare")}
            />
            <input
              type="button"
              className={`w-full p-2 border-2 text-center cursor-pointer ${
                signatureType === "ge-en-gava"
                  ? "bg-blue-700"
                  : "bg-transparent"
              }`}
              value="Ge en gåva"
              onClick={() => handleButtonClick("ge-en-gava")}
            />
          </div>
          {(signatureType === "bli-manadsgivare" ||
            signatureType === "ge-en-gava") && (
            <DonationAmountOptions
              donationAmount={donationAmount}
              handleDonationAmountClick={handleDonationAmountClick}
            />
          )}
          {donationMessages[donationAmount] && (
            <div>
              <p className="mt-4">{donationMessages[donationAmount]}</p>
              {donationAmount === "VALFRITT" && (
                <div className="mt-4">
                  <input
                    className="w-full p-2 bg-transparent border-b-2 border-white placeholder-white"
                    type="text"
                    placeholder="Ange valfritt belopp"
                    onChange={(e) => setCustomDonationAmount(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}
          <input
            type="text"
            name="fullName"
            placeholder="Fullständigt namn"
            required
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border bg-gray-700 border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Epostadress*"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border bg-gray-700 border-gray-300 rounded"
          />
          <p>Vi vill gärna tacka dig!</p>
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobilnummer*"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
            className="w-full p-2 mt-1 border text-gray-900 bg-gray-700 border-gray-300 rounded"
          />
          {formErrors.email && (
            <p className="error bg-red-400/60 p-2 rounded-full">
              {formErrors.email}
            </p>
          )}
          {formErrors.mobileNumber && (
            <p className="error bg-red-400/60 p-2 rounded-full">
              {formErrors.mobileNumber}
            </p>
          )}
          {formErrors.personalNumber && (
            <p className="error bg-red-400/60 p-2 rounded-full">
              {formErrors.personalNumber}
            </p>
          )}
          <div className="flex justify-between items-center space-x-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="checkedForTaxReduction"
                id="tax-reduction"
                onChange={handleCheckboxChange}
              />
              <label>Jag vill ha skattereduktion (not required)</label>
            </div>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="cursor-pointer text-white text-xl"
              onClick={() =>
                Swal.fire({
                  title: "Information",
                  text: "Information about skattReduktion",
                  icon: "info",
                  confirmButtonText: "Close",
                })
              }
            />
          </div>
          {formData.checkedForTaxReduction && (
            <div>
              <p>
                Tack för att du valt att stödja oss! För att vi ska kunna skicka
                skattereduktionen till dig behöver vi ditt personnummer.
              </p>
              <input
                type="text"
                name="personalNumber"
                placeholder="Personnummer"
                value={formData.personalNumber}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border border-gray-300 text-gray-900 rounded"
              />
            </div>
          )}
        </div>
        <button
          className="w-full p-2 mt-1 bg-blue-500 text-white rounded cursor-pointer transition-colors duration-300 hover:bg-blue-700 flex items-center justify-center space-x-2"
          type="submit"
        >
          <FontAwesomeIcon icon={faHeart} />
          <span>To Payment ({donationAmount})</span>
        </button>
      </form>
    </div>
  );
}
