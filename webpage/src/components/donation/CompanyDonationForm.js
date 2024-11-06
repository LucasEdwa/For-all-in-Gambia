import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const generateDonationMessage = (amount, amountMessage) =>
  `Every month your ${amount} kr ${amountMessage}. As donor you give hopp to Gambias communite to continue healing and growing to a better place on earth.`;

const donationMessages = {
  "10000 KR": generateDonationMessage("10000"),
  "40000 KR": generateDonationMessage("40000"),
  VALFRITT: generateDonationMessage("valfria"),
};

export default function CompanyDonationForm({ formData, setFormData }) {
  const [signatureType, setSignatureType] = useState("ge-en-gava");
  const [donationAmount, setDonationAmount] = useState("10000 KR");
  const [customDonationAmount, setCustomDonationAmount] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateCompanyForm = () => {
    let errors = {};
    if (!formData.companyRegistrationNumber)
      errors.companyRegistrationNumber = "Organization number is required";
    if (!formData.companyEmail)
      errors.companyEmail = "Company email is required";
    if (!formData.companyFirstName)
      errors.companyFirstName = "First name is required";
    if (!formData.companyLastName)
      errors.companyLastName = "Last name is required";
    if (!formData.companyMobileNumber)
      errors.companyMobileNumber = "Mobile number is required";
    return errors;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const errors = validateCompanyForm();
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

  const handleCustomDonationAmountChange = (event) => {
    setCustomDonationAmount(event.target.value);
  };

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-md mx-auto p-5 shadow-md font-sans"
      >
        <div className="space-y-5">
          <div className="flex w-full">
            <input
              type="button"
              className={`w-full p-2 border-2 text-center cursor-pointer ${
                signatureType === "ge-en-gava"
                  ? "bg-blue-700"
                  : "bg-transparent"
              }`}
              value="Gift"
              onClick={() => handleButtonClick("ge-en-gava")}
            />
          </div>
          <div className="flex gap-1 mt-4">
            {["10000 KR", "40000 KR", "VALFRITT"].map((amount) => (
              <input
                className={`p-2 border-2 text-center w-full cursor-pointer ${
                  donationAmount === amount ? "bg-blue-700" : "bg-transparent"
                }`}
                key={amount}
                type="button"
                value={amount}
                onClick={() => handleDonationAmountClick(amount)}
              />
            ))}
          </div>
          {donationMessages[donationAmount] && (
            <div>
              <p className="mt-4">{donationMessages[donationAmount]}</p>
              {donationAmount === "VALFRITT" && (
                <div className="mt-4">
                  <input
                    className="w-full p-2 bg-transparent border-b-2 border-white placeholder-white"
                    type="text"
                    placeholder="type your donation amount"
                    onChange={handleCustomDonationAmountChange}
                  />
                </div>
              )}
            </div>
          )}
          <div>
            <label htmlFor="companyRegistrationNumber">
              Organizationsnummer*
            </label>
            <div className="flex space-x-2">
              <input
                type="search"
                name="companyRegistrationNumber"
                placeholder="xxxxxx-xxxx"
                required
                onChange={handleInputChange}
                className="flex-1 p-2 mt-1 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div>
            <label htmlFor="companyEmail">Company Email*</label>
            <input
              type="email"
              name="companyEmail"
              required
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label>Person to contact</label>
            <p>
              Your contact information in case we need to reach you regarding
              your order.
            </p>
          </div>
          <div className="space-y-5">
            <div>
              <label htmlFor="companyFirstName">First Name*</label>
              <input
                type="text"
                name="companyFirstName"
                required
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border text-gray-900 border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="companyLastName">Efternamn*</label>
              <input
                type="text"
                name="companyLastName"
                required
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border text-gray-900 border-gray-300 rounded"
              />
            </div>
            <div>
              <label htmlFor="companyMobileNumber">Mobilnummer*</label>
              <input
                type="text"
                name="companyMobileNumber"
                required
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border text-gray-900 border-gray-300 rounded"
              />
            </div>
          </div>
          {Object.keys(formErrors).map((key) => (
            <p key={key} className="error bg-red-400/60 p-2 rounded-full">
              {formErrors[key]}
            </p>
          ))}
          <button
            className="w-full p-2 mt-1 bg-blue-500 text-white rounded cursor-pointer transition-colors duration-300 hover:bg-blue-700 flex items-center justify-center space-x-2"
            type="submit"
          >
            <FontAwesomeIcon icon={faHeart} />
            <span>To Payment ({donationAmount})</span>
          </button>
        </div>
      </form>
    </div>
  );
}
