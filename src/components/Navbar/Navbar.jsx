import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md relative z-50">
      {/* Clickable Logo */}
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-widest bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent font-[Montserrat]"
      >
        FITPULSE
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex gap-6">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <Link to="/dashboard" className="hover:text-orange-500">Dashboard</Link>
        <Link to="/profile" className="hover:text-orange-500">Profile</Link>
        <Link to="/login" className="hover:text-orange-500">Login</Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-start p-6 gap-4 shadow-md md:hidden">
          <Link onClick={toggleMenu} to="/" className="hover:text-orange-500 w-full">Home</Link>
          <Link onClick={toggleMenu} to="/dashboard" className="hover:text-orange-500 w-full">Dashboard</Link>
          <Link onClick={toggleMenu} to="/profile" className="hover:text-orange-500 w-full">Profile</Link>
          <Link onClick={toggleMenu} to="/login" className="hover:text-orange-500 w-full">Login</Link>
        </div>
      )}
    </nav>
  );
}
