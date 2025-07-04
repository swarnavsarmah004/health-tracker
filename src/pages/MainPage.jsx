import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, HeartPulse, Droplets, CheckCircle } from "lucide-react";

export default function MainPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col items-center justify-center overflow-hidden px-4 py-16">
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
        className="text-4xl md:text-6xl font-extrabold mb-4 text-center z-10 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent tracking-tight"
        style={{
          fontFamily: "'Poppins', sans-serif",
          textShadow: "0 2px 10px rgba(249, 115, 22, 0.3)",
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to <span className="uppercase tracking-widest">FITPULSE</span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-lg mb-8 max-w-xl text-gray-300 text-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Your smart companion to track steps, monitor heart rate, stay hydrated,
        and achieve your health goals.
      </motion.p>

      {/* Stats preview */}
      <motion.div
        className="flex flex-col md:flex-row gap-6 mb-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
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
        className="flex flex-col sm:flex-row gap-4 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <Link
          to="/login"
          className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full text-black font-bold transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="border border-orange-500 px-8 py-3 rounded-full text-orange-500 font-bold hover:bg-orange-500 hover:text-black transition"
        >
          Sign Up
        </Link>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        className="relative z-10 mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur hover:shadow-lg transition">
          <Activity className="mx-auto text-orange-500 mb-2" size={32} />
          <p className="font-semibold">Track Daily Steps</p>
        </div>
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur hover:shadow-lg transition">
          <HeartPulse className="mx-auto text-orange-500 mb-2" size={32} />
          <p className="font-semibold">Monitor Heart Rate</p>
        </div>
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur hover:shadow-lg transition">
          <Droplets className="mx-auto text-orange-500 mb-2" size={32} />
          <p className="font-semibold">Hydration Reminder</p>
        </div>
        <div className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur hover:shadow-lg transition">
          <CheckCircle className="mx-auto text-orange-500 mb-2" size={32} />
          <p className="font-semibold">Achieve Your Goals</p>
        </div>
      </motion.div>
    </div>
  );
}
