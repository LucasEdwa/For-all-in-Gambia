import { Link } from "react-router-dom";
import hero1Img from "../images/hero01.jpg";

export default function Hero1() {
  return (

      <div className="w-full">
        {" "}
        <img
          src={hero1Img}
          alt="hero1"
          className=" h-[300px]  object-cover absolute z-0"
        />
        <div className=" relative lg:flex lg:justify-between  pl-5 items-start ">
          <div className="text-left lg:mt-28   hover:scale-105 ">
            <h2 className=" text-black p-1 text-xs bg-green-600 mt-1 ">
              Organic farm - sustainable - community
            </h2>
            <h3 className="bg-green-600  text-black text-sm ">
              Help our community grow,
            </h3>
            <h5 className="bg-yellow-400  text-black text-xs ">
              we are worth it!
            </h5>
            <div className=" py-2 px-4">
              <Link
                to="/donate"
                className=" text-sm no-underline bold text-black py-2 px-4 bg-red-700 hover:scale-105 transition-all ease-in-out duration-300"
              >
                GIVE A GIFT
              </Link>
            </div>
          </div>
          <div className=" lg:w-1/3 w-screen   lg:p-4   text-black  bg-opacity-100 rounded-lg text-lg">
            <article className="overflow-hidden ml-10 rounded-lg border w-4/5 mt-6 border-gray-100 bg-white shadow-sm">
              <div className="p-4 sm:p-6 ">
                <img alt="" src={hero1Img} className="w-full object-cover" />

                <p className="lg:text-sm text-xs mt-2">
                  <span className="lg:text-primary ">Welcome to Boraba,</span> a
                  dynamic hub nestled in the heart of The Gambia's Central River
                  Region. Home to approximately 1500 residents, Boraba is more
                  than just a community; it's a melting pot of cultures and
                  traditions, where diverse ethnic groups thrive in perfect
                  harmony, creating a tapestry of unity and resilience.
                </p>

                <Link
                  to="/projects/2"
                  className="group  inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                >
                  Find out more
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
   
  );
}
