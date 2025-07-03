import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MainPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center justify-center overflow-hidden p-8">
      {/* Animated background blobs */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-orange-500 rounded-full opacity-20 blur-3xl top-10 left-10"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-orange-700 rounded-full opacity-20 blur-3xl bottom-10 right-10"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -360, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Hero text */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold mb-6 text-center z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to <span className="text-orange-500">Health Tracker</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-lg mb-8 max-w-xl text-gray-300 text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Track your steps, sleep, heart rate, calories, and hydration — stay healthy with your personal smart dashboard.
      </motion.p>

      {/* Stats preview */}
      <motion.div
        className="flex gap-8 mb-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="text-center">
          <p className="text-3xl font-bold text-orange-500">8,732</p>
          <p className="text-sm text-gray-400">Steps Today</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-orange-500">72 bpm</p>
          <p className="text-sm text-gray-400">Heart Rate</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-orange-500">1.8 L</p>
          <p className="text-sm text-gray-400">Water Intake</p>
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        className="flex gap-4 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <Link
          to="/login"
          className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded text-black font-bold transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="border border-orange-500 px-6 py-3 rounded text-orange-500 font-bold hover:bg-orange-500 hover:text-black transition-colors"
        >
          Sign Up
        </Link>
      </motion.div>
    </div>
  );
}
