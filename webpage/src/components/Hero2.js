import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import hero2Img from "../images/hero2.jpg";

export default function Hero2() {
  return (
    <div className="lg:py-4">
      <div className="lg:w-full xs:w-screen  shadow-teal-200 shadow-inner">
        <div className="flex xs:flex-col items-center justify-center text-black text-lg ml-0  font-medium text-center lg:gap-4 lg:my-5  xs:mx-0">
          <div className="lg:flex lg:ml-2 xs:flex-col">
            <div className="lg:p-4 xs:p-2  ">
              <h1 className="lg:text-lg xs:text-sm">News: </h1>
            </div>
            <div className="flex gap-2 xs:p-0 lg:p-4 items-center ">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faAngleRight} />
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
              <Link
                className="text-black lg:text-lg text-xs no-underline hover:text-blue-500 hover:underline"
                to="/projects"
              >
                Read about what we do in Gambia
              </Link>
            </div>
            <div className="flex gap-2  lg:p-4 items-center">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faAngleRight} />
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
              <Link
                className="text-black lg:text-lg text-sm no-underline hover:text-blue-500 hover:underline"
                to="/donate"
              >
                Become a world contributor!
              </Link>
            </div>
            <div className="flex gap-2 lg:p-4  items-center">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faAngleRight} />
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
              <Link
                className=" lg:text-lg text-sm text-black no-underline hover:text-blue-500 hover:underline"
                to="/partners"
              >
                Our partners
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex xs:flex-col xs:w-screen text-left justify-center items-center gap-4">
        <div className="">
          <img
            className="lg:w-full xs:w-screen h-64 object-cover"
            src={hero2Img}
            alt="donation"
          />
        </div>
        <div className="flex flex-col gap-4 p-4 ">
          <div className="xs:w-full">
            <h1 className="text-xl bg-gradient-to-r from-blue-500 to-purple-500 w-max text-white font-bold">
              Purchase a craft tool directly from Gambia
            </h1>
            <h1 className="text-xl bg-gradient-to-r from-blue-500 to-purple-500 w-max text-white font-bold">
              to build schools for children
            </h1>
            <p className="text-sm font-medium">
              when you buy a craft tool from our gift shop, you help us to
              purchase materials for building schools in Boraba.
            </p>
            <p className="text-sm font-medium">
              we are a non-profit organization that helps Gambias society to
              inclution and education for all children.
            </p>
            <p className="text-sm font-medium">
              Come and join us in our mission to build a better future for the
              children.
            </p>
          </div>
          <div className="border-t p-3 border-green-600 hover:blu border-b w-max">
            <Link
              to="gift-shopping"
              className="bg-red-800 hover:bg-red-600 p-1 my-1 no-underline text-white"
            >
              Buy on our gift shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
