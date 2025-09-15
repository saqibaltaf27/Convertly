import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceLinks = [
    { label: "Compress PDF", to: "/compress-pdf" },
    { label: "Compress Image", to: "/compress-image" },
    { label: "Word to Excel", to: "/word-to-excel" },
    { label: "Excel to Word", to: "/excel-to-word" },
    { label: "PDF to Word", to: "/pdf-to-word" },
    { label: "PDF Editor", to: "/pdf-editor" },
  ];

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition"
        >
          Convertly
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative group hover:text-blue-700 transition"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-700 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 hover:text-blue-700 transition"
            >
              Services <ChevronDown size={16} className="mt-0.5" />
            </button>

            <div
              className={`absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 origin-top ${
                servicesOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {serviceLinks.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  onClick={() => setServicesOpen(false)}
                  className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700 transition"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-700 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white/95 backdrop-blur-md shadow-lg transform transition-transform ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileOpen(false)}>
            <X size={28} />
          </button>
        </div>
        <div className="flex flex-col px-6 space-y-4 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className="py-2 hover:text-blue-700 transition"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Services */}
          <div className="border-t border-gray-200 pt-2">
            <button
              className="w-full flex justify-between items-center py-2 hover:text-blue-700"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <span>Services</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {servicesOpen && (
              <div className="pl-4 flex flex-col space-y-2 mt-1">
                {serviceLinks.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    onClick={() => {
                      setMobileOpen(false);
                      setServicesOpen(false);
                    }}
                    className="py-1 hover:text-blue-700 transition"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
