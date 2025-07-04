import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email);
    // Replace with real auth logic if needed
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden px-4">
      {/* Optional subtle background glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-orange-500 opacity-10 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />

      {/* Glass Card */}
      <motion.div
        className="relative z-10 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-4 rounded transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
