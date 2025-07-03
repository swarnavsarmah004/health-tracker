import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", calories: 200 },
  { day: "Tue", calories: 350 },
  { day: "Wed", calories: 500 },
  { day: "Thu", calories: 400 },
  { day: "Fri", calories: 550 },
  { day: "Sat", calories: 600 },
  { day: "Sun", calories: 450 },
];

export default function AnalyticsChart() {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 text-orange-400">Calories Burned</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="calories" stroke="#f97316" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
