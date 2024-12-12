import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { IoSearchOutline, IoBagHandleOutline } from "react-icons/io5";
import HamburgerMenu from "./HamburgerMenu.jsx";
import Cart from "./Cart.jsx";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const products = useSelector((state) => state.cart.products);

  const links = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Vouchers", path: "/vouchers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="sticky text-text sm:static top-0 bg-primary sm:bg-white z-50 flex max-h-[100px] w-full pr-6 md:px-40 xl:px-80 2xl:px-[450px]">
      {/* Hamburger menu for small screens */}
      <div className="sm:hidden flex z-50">
        <HamburgerMenu links={links} />
      </div>

      {/* Navbar Links */}
      <div className="flex px-2sm:px-10 py-2 sm:py-10 justify-between w-full">
        <div className="sm:flex items-center gap-5 justify-between hidden">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={`hover:underline text-text ${
                location.pathname === link.path ? "underline" : ""
              }`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Icons */}
        <div className="flex gap-4 items-center z-50 ml-auto">
          {/* Search Icon */}
          <div className="hidden sm:block cursor-pointer relative bottom-[2px]">
            <IoSearchOutline size={"25px"} />
          </div>
          <div className="sm:hidden visible cursor-pointer relative bottom-[2px]">
            <IoSearchOutline size={"40px"} />
          </div>

          {/* Bag Icon */}
          <div
            className="cursor-pointer relative bottom-[2px]"
            onClick={() => setOpen(!open)}
          >
            <IoBagHandleOutline className="hidden sm:block" size={"25px"} />
            <IoBagHandleOutline className="sm:hidden visible" size={"40px"} />
            <span className="absolute sm:left-[15px] left-[20px] sm:top-[13px] top-[20px] bg-amber-300 rounded-full sm:h-4 sm:w-4 w-6 h-6 flex items-center justify-center text-xs">
              {products.length}
            </span>
          </div>
        </div>
      </div>
      {/* Cart Component */}
      {open && (
        <div className="absolute right-2 top-14 sm:right-4 md:right-8 lg:right-40 xl:right-80 bg-white overflow-hidden shadow-lg z-40 w-full sm:w-auto max-w-xs">
          <Cart />
        </div>
      )}
    </div>
  );
};

export default Navbar;
