import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", steps: 4000 },
  { day: "Tue", steps: 6500 },
  { day: "Wed", steps: 8000 },
  { day: "Thu", steps: 7000 },
  { day: "Fri", steps: 9000 },
  { day: "Sat", steps: 10000 },
  { day: "Sun", steps: 7500 },
];

export default function ActivityCard() {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 text-orange-400">Daily Steps</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="steps" stroke="#f97316" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
