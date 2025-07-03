import ActivityCard from "./ActivityCard";
import AnalyticsChart from "./AnalyticsChart";
import GoalsProgress from "./GoalsProgress";
import HeartRateCard from "./HeartRateCard";
import HydrationLog from "./HydrationLog";
import NutritionLog from "./NutritionLog";
import SleepCard from "./SleepCard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl text-orange-500 font-bold mb-8 text-center">
        My Health Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ActivityCard />
        <HeartRateCard />
        <SleepCard />
        <HydrationLog />
        <NutritionLog />
        <GoalsProgress />
        <AnalyticsChart />
      </div>
    </div>
  );
}
