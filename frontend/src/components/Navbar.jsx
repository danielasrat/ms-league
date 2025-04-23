import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Events", to: "/user-events2" },
    { label: "TV Programs", to: "/user-tv-shows2" },
    { label: "Contact", to: "/contact" },
    { label: "Register", to: "/user-register" },
    { label: "Login", to: "/user-login" },
  ];

  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-yellow-500">
          MS<span className="text-black">League</span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `relative font-medium text-gray-800 hover:text-black transition duration-200 ${
                    isActive
                      ? "after:absolute after:-bottom-1 after:left-0 after:h-1 after:w-full after:bg-yellow-400"
                      : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA Button - hide on small screen */}
        <button
          onClick={() => navigate('/contact')}
          className="hidden md:block bg-blue-700 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-800 transition duration-200"
        >
          Contact Us
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="flex flex-col gap-4 mt-4 md:hidden">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block font-medium text-gray-800 hover:text-black ${
                    isActive ? "text-yellow-500" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <button
            onClick={() => {
              navigate('/contact');
              setOpen(false);
            }}
            className="bg-blue-700 text-white px-4 py-2 rounded-md font-medium w-fit"
          >
            Contact Us
          </button>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;