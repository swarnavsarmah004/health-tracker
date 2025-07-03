import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SetupProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "light",
    goal: "maintain",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);

    // Save to backend or localStorage here!
    localStorage.setItem("userProfile", JSON.stringify(formData));

    // Navigate to dashboard or custom routine page
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        Complete Your Profile
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow w-full max-w-md space-y-4"
      >
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={formData.height}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={formData.weight}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        />
        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        >
          <option value="light">Lightly Active</option>
          <option value="moderate">Moderately Active</option>
          <option value="high">Very Active</option>
        </select>
        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 text-white"
          required
        >
          <option value="maintain">Maintain Weight</option>
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Muscle</option>
        </select>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 p-3 rounded text-black font-bold"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
}
