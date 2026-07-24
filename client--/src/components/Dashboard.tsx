import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <DashboardCard
          title="Today's Sales"
          value="₱0.00"
        />

        <DashboardCard
          title="Products"
          value="0"
        />

        <DashboardCard
          title="Orders"
          value="0"
        />

        <DashboardCard
          title="Low Stocks"
          value="0"
        />

      </div>

    </div>
  );
}