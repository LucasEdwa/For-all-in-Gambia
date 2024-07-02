import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-[#4c5d80] text-white  text-xs  bottom-0 lg:w-full">
      <div className="flex justify-between lg:max-w-screen-xl pt-2">
        <div className="mr-5 p-2">
          <h4 className="mb-2">Brick by Brick</h4>
          <p className="mb-2">
            We work in one of the world’s toughest places, to reach most
            disadvantaged children in Africa.
          </p>
          <button className="bg-yellow-400 border-none p-2.5 cursor-pointer">
            Donate Now
          </button>
        </div>
        <div className="mr-5">
          <h4 className="mb-2">Support Us</h4>
          <ul className="list-none p-0">
            <li className="mb-1">Donate today</li>
            <li className="mb-1">Monthly donations</li>
            <li className="mb-1">Corporate gifts</li>
          </ul>
        </div>
        <div className="mr-5">
          <h4 className="mb-2">About Us</h4>
          <ul className="list-none p-0">
            <li className="mb-1">What we do</li>
            <Link to="/contact" className="mb-1">
              Contact us!
            </Link>
            <li className="mb-1">FAQ</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
