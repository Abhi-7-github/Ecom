import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <motion.div 
                        className="text-blue-600 font-bold text-xl"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Abhiram's Ecom
                    </motion.div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6">
                        {["/", "/create", "/cart", "/login"].map((path, index) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                    }`
                                }
                            >
                                {path === "/" ? "Home" : path.slice(1).replace("-", " ").charAt(0).toUpperCase() + path.slice(2)}
                            </NavLink>
                        ))}
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with Animation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="md:hidden bg-white py-2 px-4 shadow-lg border-t"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ul className="space-y-2">
                            {["/", "/create", "/cart", "/login"].map((path) => (
                                <li key={path}>
                                    <NavLink
                                        to={path}
                                        className={({ isActive }) =>
                                            `block px-4 py-2 rounded-md text-base transition-colors duration-200 ${
                                                isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                            }`
                                        }
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {path === "/" ? "Home" : path.slice(1).replace("-", " ").charAt(0).toUpperCase() + path.slice(2)}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;