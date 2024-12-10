import React, { useState } from "react";
import Hamburger from "hamburger-react";
import { NavLink, useLocation } from "react-router-dom";

const HamburgerMenu = ({ links }) => {
    const location = useLocation();
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="fixed">
            {/* Hamburger Icon */}
            <div className="z-50 relative top-1 left-4">
                <Hamburger
                    size={45}
                    toggled={isOpen}
                    toggle={setOpen}
                    easing={"ease-in"}
                />
            </div>

            {/* Menu */}
            {isOpen && (
                <div className="absolute top-0 left-0 z-40 w-screen h-screen bg-white text-black text-center">
                    <div className="flex flex-col mt-40 gap-8">
                        {links.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={() => setOpen(false)}
                                className={`text-gray-900 text-3xl ${
                                    location.pathname === link.path ? "underline" : ""
                                }`}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HamburgerMenu;
