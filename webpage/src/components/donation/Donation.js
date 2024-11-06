import React, { useState } from "react";
import PrivateDonationForm from "./PrivateDonationForm";
import CompanyDonationForm from "./CompanyDonationForm";
import hero1 from "../../images/img_donation.jpeg";

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
    <div className=" lg:flex  items-center mb-32 justify-center" >
      <div className=" lg:w-[29rem] xs:w-[100%] px-2 py-4 lg:m-4   bg-gradient-to-b from-red-500 via-blue-500 to-green-500 text-white shadow-lg lg:rounded-2xl z-10">
        <h1 className="text-xl font-bold">
          Stötta Bio's Brick by Brick Internations arbete!
        </h1>
        <p className="text-xs ">
          By helping Brick by Brick International, you are helping to build a
          better future for the family in Uganda, show that there is still hope
          and you are capable to make a difference in the world.
        </p>
        <div className="flex flex-col  m-0 ">
          <div className="flex items-center gap-2">
            <h1 className="text-xs p-2">Donate as:</h1>
            <input
              type="radio"
              id="privat-person"
              name="donation"
              value="privat-person"
              onChange={handleDonationTypeChange}
              defaultChecked
              className=""
            />
            <label htmlFor="privat-person" className="text-sm">
              Private person
            </label>
            <input
              type="radio"
              id="foretag"
              name="donation"
              value="foretag"
              onChange={handleDonationTypeChange}
              className=""
            />
            <label htmlFor="foretag" className="text-sm">
              Company
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
      <img src={hero1} alt="hero" className="lg:w-1/2 xs:w-full lg:h-[30rem] xs:h-[10rem] object-cover p-4 lg:absolute right-0" />

    </div>
  );
} 
