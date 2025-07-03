import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold text-orange-500">
        Health Tracker
      </div>

      <div className="flex gap-6">
        <Link to="/" className="hover:text-orange-500">Home</Link>
        <Link to="/dashboard" className="hover:text-orange-500">Dashboard</Link>
        <Link to="/profile" className="hover:text-orange-500">Profile</Link>
        <Link to="/login" className="hover:text-orange-500">Login</Link>
      </div>
    </nav>
  );
}
