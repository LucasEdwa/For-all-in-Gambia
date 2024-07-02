import { Link } from "react-router-dom";
import hero1Img from "../images/hero01.jpg";

export default function Hero1() {
  return (
    <div className="">
      <div className=" xs:w-screen lg:w-full">
        {" "}
        <img
          src={hero1Img}
          alt="hero1"
          className="lg:w-full h-[400px] object-cover rounded-lg absolute z-0"
        />
        <div className=" relative lg:flex lg:justify-between pl-5 items-end ">
          <div className="text-left lg:mt-28 mt-1 hover:scale-105">
            <h2 className="text-[15px] text-black p-1  bg-green-600 ">
              Organic farm - sustainable - community
            </h2>
            <p className="bg-yellow-400 text-black text-md ">
              Help our community grow,
            </p>
            <p className="bg-yellow-400 text-black text-md ">
              we are worth it!
            </p>
            <div className=" py-2 px-4">
              <Link
                to="/donate"
                className=" text-sm no-underline bold text-black py-2 px-4 bg-red-700 hover:scale-105 transition-all ease-in-out duration-300"
              >
                GIVE A GIFT
              </Link>
            </div>
          </div>
          <div className=" lg:w-1/3 xs:w-screen  right-0 lg:p-4  text-black  bg-opacity-100 rounded-lg text-lg">
            <article className="overflow-hidden xs:mt-4 rounded-lg border border-gray-100 bg-white shadow-sm">
              <div className="p-4 sm:p-6">
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
    </div>
  );
}
