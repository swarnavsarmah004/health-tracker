import { useEffect, useState } from "react";
import { Upload, Edit3, LogOut, Award, Activity, Target } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const data = [
    { day: "Mon", progress: 30 },
    { day: "Tue", progress: 50 },
    { day: "Wed", progress: 60 },
    { day: "Thu", progress: 80 },
    { day: "Fri", progress: 70 },
    { day: "Sat", progress: 90 },
    { day: "Sun", progress: 85 },
  ];

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    const storedName = localStorage.getItem("userName");
    const pic = localStorage.getItem("profilePic");

    let parsedProfile = {};
    if (stored) parsedProfile = JSON.parse(stored);
    if (!parsedProfile.name && storedName) parsedProfile.name = storedName;

    setProfile(parsedProfile);
    setFormData(parsedProfile);
    if (pic) setProfilePic(pic);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(formData));
    localStorage.setItem("userName", formData.name || "");
    setProfile(formData);
    setEditing(false);
  };

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profilePic", reader.result);
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <motion.div
        className="absolute w-[700px] h-[700px] bg-orange-500 opacity-10 blur-3xl rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />

      {/* Glass Card */}
      <motion.div
        className="relative z-10 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-6 w-full max-w-xl flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Profile Pic - Static */}
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full border-4 border-orange-500 flex items-center justify-center overflow-hidden">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-4xl font-bold text-orange-500">👤</div>
            )}
          </div>
        </div>

        {/* Upload */}
        <label
          htmlFor="profilePicUpload"
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-orange-500 cursor-pointer mb-4"
        >
          <Upload size={16} /> Upload Photo
        </label>
        <input
          id="profilePicUpload"
          type="file"
          accept="image/*"
          onChange={handlePicUpload}
          className="hidden"
        />

        {/* Name & Details */}
        <motion.h2
          className="text-3xl font-bold mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {profile?.name || "Your Name"}
        </motion.h2>
        <p className="text-gray-400 mb-4">
          Age: {profile?.age || "-"} | Gender: {profile?.gender || "-"}
        </p>

        {/* Stats */}
        <div className="flex flex-col md:flex-row gap-8 mb-6 w-full justify-around">
          <div className="flex flex-col items-center">
            <Award className="text-orange-500 mb-2" />
            <p className="text-lg font-bold">3 Badges</p>
            <span className="text-gray-400 text-sm">Achievements</span>
          </div>
          <div className="flex flex-col items-center">
            <Activity className="text-orange-500 mb-2" />
            <p className="text-lg font-bold">{profile?.activityLevel || "-"}</p>
            <span className="text-gray-400 text-sm">Activity</span>
          </div>
          <div className="flex flex-col items-center">
            <Target className="text-orange-500 mb-2" />
            <p className="text-lg font-bold">{profile?.goal || "-"}</p>
            <span className="text-gray-400 text-sm">Goal</span>
          </div>
        </div>

        {/* Fancy Chart */}
        <div className="w-full bg-gradient-to-b from-black to-gray-900 rounded-xl p-4 mb-6 shadow-inner">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{ backgroundColor: "#111", border: "none" }}
              />
              <Line
                type="monotone"
                dataKey="progress"
                stroke="#f97316"
                strokeWidth={3}
                dot={{ r: 4, stroke: "#fff", fill: "#f97316" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-black font-bold rounded-full transition"
          >
            <Edit3 size={18} /> Edit
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 border border-orange-500 hover:bg-orange-500 hover:text-black rounded-full transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </motion.div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-20 p-4">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl mb-4 font-bold text-orange-500">
              Edit Profile
            </h3>
            <div className="space-y-4">
              <input
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
              <input
                name="age"
                value={formData.age || ""}
                onChange={handleChange}
                placeholder="Age"
                type="number"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
              <input
                name="height"
                value={formData.height || ""}
                onChange={handleChange}
                placeholder="Height (cm)"
                type="number"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
              <input
                name="weight"
                value={formData.weight || ""}
                onChange={handleChange}
                placeholder="Weight (kg)"
                type="number"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
            </div>
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 border border-gray-600 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-orange-500 text-black rounded font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
