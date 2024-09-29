import logo from "../images/file.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/queries/getUser";

const navItems = [
  { id: 1, to: "/", label: "Home" },
  { id: 2, to: "/goals", label: "Uppdrag & Vision" },
  { id: 3, to: "/projects", label: "Projekt" },
  { id: 4, to: "/login", label: "Log-In" },
]; // Add more items here

const NavItem = ({ to, label, onClick }) => (
  <li>
    <Link
      to={to}
      className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
      onClick={onClick} // Call the onClick function when the Link is clicked
    >
      {label}
    </Link>
  </li>
);

const NavDropdown = ({ label, children }) => (
  <li>
    <details className="group [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
        <span className="text-sm font-medium">{label}</span>
        <span className="shrink-0 transition duration-300 group-open:-rotate-180"></span>
      </summary>
      <ul className="mt-2 space-y-1 px-4">{children}</ul>
    </details>
  </li>
);

export default function Header() {
  const [isBarVisible, setBarVisible] = useState(false);

  const { data: user, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  if (error) {
    console.error(error);
  }

  const handleLogoClick = () => {
    setBarVisible(!isBarVisible);
  };
  // Function to close the navbar
  const closeNavBar = () => {
    setBarVisible(false);
  };
  return (
    <div className="flex  flex-col justify-between border-e bg-white shadow-sm">
      <div className="">
        <h1
          className="flex items-center gap-6   w-fit place-content-center rounded-lg lg:text-xl text-gray-600"
          onClick={handleLogoClick}
        >
          <img src={logo} className="w-20 object-cover h-15 " alt="Bios Logo" />{" "}
          || For Gambia
        </h1>

        {isBarVisible && (
          <ul className="mt-6 space-y-1">
            {navItems.map((item, index) =>
              !item.disabled ? (
                <NavItem
                  key={index}
                  to={item.to}
                  label={item.label}
                  onClick={closeNavBar}
                />
              ) : (
                <NavDropdown key={item.label} label={item.label}>
                  {/* Add dropdown items here */}
                </NavDropdown>
              )
            )}
            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
              <Link
                to="#"
                className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
              >
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="size-10 rounded-full object-cover"
                />

                <div>
                  <p className="text-xs">
                    <strong className="block font-medium">
                      {user
                        ? user.user.firstName + " " + user.user.lastName
                        : "Eric Clapton"}
                    </strong>
                    <span>
                      {" "}
                      {user ? user.user.email : "eric@frusciante.com"}{" "}
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
