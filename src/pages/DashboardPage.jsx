import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [name, setName] = useState("Guest");
  const [hydration, setHydration] = useState(
    Number(localStorage.getItem("hydration")) || 0
  );
  const [reminderTime, setReminderTime] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("fullName");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const stepsData = [
    { day: "Mon", steps: 3000 },
    { day: "Tue", steps: 5000 },
    { day: "Wed", steps: 7000 },
    { day: "Thu", steps: 6500 },
    { day: "Fri", steps: 8000 },
    { day: "Sat", steps: 9000 },
    { day: "Sun", steps: 7500 },
  ];

  const sleepData = [
    { day: "Mon", sleep: 6 },
    { day: "Tue", sleep: 7 },
    { day: "Wed", sleep: 7.5 },
    { day: "Thu", sleep: 6.8 },
    { day: "Fri", sleep: 8 },
    { day: "Sat", sleep: 7.5 },
    { day: "Sun", sleep: 7 },
  ];

  const heartRateData = [
    { time: "6AM", bpm: 65 },
    { time: "9AM", bpm: 70 },
    { time: "12PM", bpm: 75 },
    { time: "3PM", bpm: 72 },
    { time: "6PM", bpm: 78 },
    { time: "9PM", bpm: 70 },
    { time: "12AM", bpm: 65 },
  ];

  const stepsGoal = 10000;
  const caloriesGoal = 500;
  const stepsToday = 7500;
  const caloriesToday = 320;

  const handleGlassClick = (index) => {
    const newHydration = index + 1 === hydration ? index : index + 1;
    setHydration(newHydration);
    localStorage.setItem("hydration", newHydration);
  };

  const ProgressRing = ({ progress = 0 }) => {
    const radius = 50;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle
          stroke="#4B5563"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke="#f97316"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1 }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fill="#f97316"
          fontSize="16"
          className="rotate-[90deg]"
        >
          {progress}%
        </text>
      </svg>
    );
  };

  // Reminder
  const handleSetReminder = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
      return;
    }
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const now = new Date();
        const [hours, minutes] = reminderTime.split(":").map(Number);
        const target = new Date();
        target.setHours(hours);
        target.setMinutes(minutes);
        target.setSeconds(0);

        let delay = target - now;
        if (delay < 0) {
          delay += 24 * 60 * 60 * 1000;
        }

        setTimeout(() => {
          new Notification("⏰ Health Reminder", {
            body: "Time for your daily check-in! 💧🚶‍♂️",
          });
        }, delay);

        alert("Reminder set!");
      }
    });
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2 text-orange-500">
        Welcome back, {name}!
      </h1>
      <p className="text-gray-400 mb-8">
        Here’s your health summary this week.
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-orange-500/20 transition">
          <p className="text-gray-400">Steps</p>
          <p className="text-2xl font-bold text-orange-500">8,732</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-orange-500/20 transition">
          <p className="text-gray-400">Calories Burned</p>
          <p className="text-2xl font-bold text-orange-500">320 kcal</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-orange-500/20 transition">
          <p className="text-gray-400">Heart Rate</p>
          <p className="text-2xl font-bold text-orange-500">72 bpm</p>
        </div>
        <div className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-orange-500/20 transition">
          <p className="text-gray-400">Sleep</p>
          <p className="text-2xl font-bold text-orange-500">7 hrs</p>
        </div>
      </div>

      {/* Weekly Steps Chart */}
      <div className="bg-gray-900 p-6 rounded-lg shadow mb-12">
        <h2 className="text-xl font-bold mb-4 text-orange-500">
          Weekly Steps
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stepsData}>
            <CartesianGrid stroke="#333" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="steps"
              stroke="#f97316"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Goals */}
      <div className="bg-gray-900 p-6 rounded-lg shadow mb-12">
        <h2 className="text-xl font-bold mb-6 text-orange-500">Daily Goals</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Steps Goal */}
          <div className="flex flex-col items-center">
            <ProgressRing
              progress={Math.round((stepsToday / stepsGoal) * 100)}
            />
            <p className="mt-4 text-gray-400">
              Steps: {stepsToday} / {stepsGoal}
            </p>
          </div>

          {/* Calories Goal */}
          <div>
            <p className="mb-2 text-gray-400">Calories: {caloriesToday} kcal</p>
            <div className="w-full bg-gray-700 h-4 rounded">
              <motion.div
                className="bg-orange-500 h-4 rounded"
                initial={{ width: 0 }}
                animate={{
                  width: `${(caloriesToday / caloriesGoal) * 100}%`,
                }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-sm mt-2 text-gray-400">
              Goal: {caloriesGoal} kcal
            </p>
          </div>

          {/* Hydration Goal */}
          <div>
            <p className="mb-2 text-gray-400">Hydration</p>
            <div className="flex gap-1 flex-wrap">
              {Array.from({ length: 8 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGlassClick(idx)}
                  className={`w-6 h-12 rounded border-2 ${
                    idx < hydration
                      ? "bg-orange-500 border-orange-500"
                      : "border-gray-600"
                  }`}
                ></button>
              ))}
            </div>
            <p className="text-sm mt-2 text-gray-400">
              Glasses: {hydration}/8
            </p>
          </div>
        </div>
      </div>

      {/* Sleep Quality */}
      <div className="bg-gray-900 p-6 rounded-lg shadow mb-12">
        <h2 className="text-xl font-bold mb-4 text-orange-500">
          Sleep Quality
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={sleepData}>
            <defs>
              <linearGradient id="sleepGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sleep"
              stroke="#f97316"
              fillOpacity={1}
              fill="url(#sleepGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Heart Rate Zones */}
      <div className="bg-gray-900 p-6 rounded-lg shadow mb-12">
        <h2 className="text-xl font-bold mb-4 text-orange-500">
          Heart Rate Zones
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={heartRateData}>
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bpm"
              stroke="#f97316"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Calendar */}
      <div className="bg-gray-900 p-6 rounded-lg shadow mb-12">
        <h2 className="text-xl font-bold mb-4 text-orange-500">Calendar</h2>
        <div className="grid grid-cols-7 gap-4">
          {days.map((day, idx) => (
            <div
              key={idx}
              className={`text-center py-2 rounded ${
                today.getDay() === idx
                  ? "bg-orange-500 text-black font-bold"
                  : "bg-gray-800"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {/* Reminder */}
      <div className="bg-gray-900 p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4 text-orange-500">Set Reminder</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white"
          />
          <button
            onClick={handleSetReminder}
            className="bg-orange-500 text-black px-6 py-3 rounded font-bold hover:bg-orange-600 transition"
          >
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
}
