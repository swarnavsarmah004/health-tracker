import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Activity, Target, Edit3, Upload, LogOut } from "lucide-react";
import { motion } from "framer-motion";

function ProgressRing({ progress = 70 }) {
  const radius = 60;
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
      <circle
        stroke="#F97316"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s" }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fill="#F97316"
        fontSize="20"
        className="rotate-[90deg]"
      >
        {progress}%
      </text>
    </svg>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [goalProgress, setGoalProgress] = useState(70);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    const pic = localStorage.getItem("profilePic");
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfile(parsed);
      setFormData(parsed);
    }
    if (pic) {
      setProfilePic(pic);
    }
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(formData));
    setProfile(formData);
    setEditing(false);
  };

  const handlePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      localStorage.setItem("profilePic", base64);
      setProfilePic(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("profilePic");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full bg-orange-500 opacity-10 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      ></motion.div>

      <motion.div
        className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center text-black text-4xl font-bold relative">
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={48} />
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="profilePicUpload"
            className="flex items-center justify-center gap-2 text-sm text-gray-300 hover:text-orange-500 cursor-pointer"
          >
            <Upload size={18} /> Upload Profile Picture
          </label>
          <input
            id="profilePicUpload"
            type="file"
            accept="image/*"
            onChange={handlePicUpload}
            className="hidden"
          />
        </div>

        <h2 className="text-3xl font-bold mb-2">{profile.name || "Your Name"}</h2>
        <p className="text-gray-400 mb-6">
          Age: {profile.age || "-"} | Gender: {profile.gender || "-"}
        </p>

        <div className="flex flex-col md:flex-row justify-around gap-8 mb-8">
          <div className="flex flex-col items-center">
            <ProgressRing progress={goalProgress} />
            <p className="mt-2 text-gray-400">Goal Progress</p>
          </div>
          <div className="flex flex-col gap-4 text-left">
            <div className="flex items-center gap-2">
              <Activity className="text-orange-500" />{" "}
              <span>{profile.activityLevel || "-"} activity</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="text-orange-500" />{" "}
              <span>Goal: {profile.goal || "-"}</span>
            </div>
            <div>
              Height:{" "}
              <span className="text-orange-500 font-bold">
                {profile.height || "-"} cm
              </span>
            </div>
            <div>
              Weight:{" "}
              <span className="text-orange-500 font-bold">
                {profile.weight || "-"} kg
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-black px-6 py-3 rounded font-bold transition"
          >
            <Edit3 size={20} />
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 border border-orange-500 hover:bg-orange-500 hover:text-black text-orange-500 px-6 py-3 rounded font-bold transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </motion.div>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20 p-4">
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl mb-4 font-bold text-orange-500">
              Edit Profile
            </h3>
            <div className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                type="number"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
              <input
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Height (cm)"
                type="number"
                className="w-full p-3 rounded bg-gray-800 text-white"
              />
              <input
                name="weight"
                value={formData.weight}
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
