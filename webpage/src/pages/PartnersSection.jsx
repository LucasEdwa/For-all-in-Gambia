import React from "react";

// Example list of partners with image URLs
const partners = [
  { name: "Partner 1", logo: "https://via.placeholder.com/150" },
  { name: "Partner 2", logo: "https://via.placeholder.com/150" },
  { name: "Partner 3", logo: "https://via.placeholder.com/150" },
  { name: "Partner 4", logo: "https://via.placeholder.com/150" },
  { name: "Partner 5", logo: "https://via.placeholder.com/150" },
];

export default function PartnersSection() {
  return (
    <div className="py-12 bg-gray-100 h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Our Partners
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md"
            >
              <img src={partner.logo} alt={partner.name} className="h-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
