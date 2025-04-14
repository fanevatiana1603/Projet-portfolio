import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MonNavbar = () => {
  const monLink = [
    { path: "/", title: "A propos" },
    { path: "/Competences", title: "Competences" },
    { path: "/Projets", title: "Projets" },
    { path: "/Contacts", title: "Contacts" },
  ];

  const [isopen, setIsOpen] = useState(false);
  const popuRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen(!isopen);
  };

  const handleClick = (e) => {
    if (popuRef.current && !popuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // Animation variants for the mobile menu
  const mobileMenuVariants = {
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    closed: {
      x: "100%",
      opacity: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Animation variants for the links
  const linkVariants = {
    hover: { scale: 1.1, color: "#06b6d4" }, // Cyan-500
    tap: { scale: 0.95 },
  };

  return (
    <div className="w-full h-screen">
      <div className="flex justify-between items-center p-3">
        <div
          className="text-[2rem] font-bold text-cyan-400"
          style={{ WebkitTextStroke: "1px #ffffff" }}
        >
          Logo
        </div>
        <div className="hidden lg:flex justify-evenly items-center w-1/2 text-xl">
          {monLink.map((item, index) => (
            <Link key={index} to={item.path} className="cursor-pointer group">
              <p className="hover:text-cyan-500 duration-300 ease-linear group-hover:-translate-y-1">
                {item.title}
              </p>
              <div className="opacity-0 w-0 border-b border-cyan-400 duration-300 ease-linear group-hover:opacity-100 group-hover:w-full"></div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 rounded-full text-cyan-600 tex-lg font-medium flex justify-center items-center border border-white ring ring-cyan-400">
            R
          </div>
          <div className="text-sm">Rindra</div>
        </div>
        <div className="block lg:hidden">
          {isopen ? (
            <X size={40} onClick={toggleOpen} />
          ) : (
            <Menu size={40} onClick={toggleOpen} />
          )}
          <AnimatePresence>
            {isopen && (
              <motion.div
                className="fixed top-20 right-35 w-60 z-50 overflow-hidden border border-cyan-300 rounded-xl"
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
              >
                <div ref={popuRef} className="w-full text-center">
                  {monLink.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ backgroundColor: "#06b6d4" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={item.path}
                        className="block p-5 w-60 bg-[#000000b2] text-white"
                      >
                        <p>{item.title}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MonNavbar;
