import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { Footprints, Flame, HeartPulse, Moon } from "lucide-react";

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  const data = [
    { day: "Mon", steps: 3000 },
    { day: "Tue", steps: 5000 },
    { day: "Wed", steps: 7000 },
    { day: "Thu", steps: 6500 },
    { day: "Fri", steps: 8000 },
    { day: "Sat", steps: 9000 },
    { day: "Sun", steps: 7500 },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white px-6 py-12 flex flex-col gap-12 overflow-hidden">
      {/* Subtle blurred shape */}
      <motion.div
        className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-orange-500 opacity-10 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />

      {/* Header */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent mb-2 text-left">
          Welcome back, {userName}
        </h1>
        <p className="text-gray-400 text-sm text-left">
          Here’s your weekly health overview.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto w-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {[
          { title: "Steps", value: "8,732", icon: <Footprints size={20} /> },
          { title: "Calories", value: "320 kcal", icon: <Flame size={20} /> },
          { title: "Heart Rate", value: "72 bpm", icon: <HeartPulse size={20} /> },
          { title: "Sleep", value: "7 hrs", icon: <Moon size={20} /> },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-gray-900 to-black/40 border border-white/10 rounded-2xl p-6 flex flex-col gap-3 shadow-md hover:shadow-orange-500/40 transition transform hover:-translate-y-1"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full text-orange-500">
              {stat.icon}
            </div>
            <p className="text-gray-400 text-sm">{stat.title}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Steps Chart */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto w-full bg-gradient-to-br from-gray-900 to-black/40 border border-white/10 rounded-2xl p-6 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold mb-4 text-orange-500 text-left">
          Weekly Steps Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="day" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "none",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#f97316" }}
              cursor={{ stroke: "#f97316", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="steps"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ r: 5, stroke: "#f97316", strokeWidth: 2, fill: "#000" }}
              activeDot={{ r: 8, fill: "#f97316" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
