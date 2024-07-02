import React, { useState } from "react";
import PrivateDonationForm from "./PrivateDonationForm";
import CompanyDonationForm from "./CompanyDonationForm";
import hero3 from "../../images/hero3.jpg";

export default function Donation() {
  const [donationType, setDonationType] = useState("privat-person");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    companyRegistrationNumber: "",
    companyEmail: "",
    companyFirstName: "",
    companyLastName: "",
    companyMobileNumber: "",
    checkedForTaxReduction: false,
    personalNumber: "",
  });

  const handleDonationTypeChange = (event) => {
    setDonationType(event.target.value);
  };

  return (
    <div className=" lg:flex  items-center xs:m-0">
      <div className=" lg:w-[29rem] xs:w-[26rem] lg:m-24 p-4 bg-gradient-to-b from-red-500 via-blue-500 to-green-500 text-white shadow-lg rounded-2xl z-10">
        <h1 className="text-2xl font-bold">
          Stötta Bio's Brick by Brick Internations arbete!
        </h1>
        <p className="my-4 ">
          Genom att stötta Brick by Brick ger du fler familjer chansen till en
          trygg framtid - tillsammans gör vi skillnad.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h1>Ge som:</h1>
            <input
              type="radio"
              id="privat-person"
              name="donation"
              value="privat-person"
              onChange={handleDonationTypeChange}
              defaultChecked
              className="mr-2"
            />
            <label htmlFor="privat-person" className="text-sm">
              Privatperson
            </label>
            <input
              type="radio"
              id="foretag"
              name="donation"
              value="foretag"
              onChange={handleDonationTypeChange}
              className="mr-2"
            />
            <label htmlFor="foretag" className="text-sm">
              Företag
            </label>
          </div>
          {donationType === "privat-person" && (
            <PrivateDonationForm
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {donationType === "foretag" && (
            <CompanyDonationForm
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
