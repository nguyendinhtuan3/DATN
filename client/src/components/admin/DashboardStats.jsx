import { useEffect, useState } from "react";
import { FaUsers, FaBook, FaMoneyBillWave, FaStar } from "react-icons/fa";

const DashboardStats = ({ stats }) => {
  const icons = [<FaUsers />, <FaBook />, <FaMoneyBillWave />, <FaStar />];

  const labels = ["Users", "Courses", "Payments", "EXP Given"];
  const values = [stats.users, stats.courses, stats.payments, stats.expGiven];
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-yellow-100 text-yellow-800",
    "bg-purple-100 text-purple-800",
  ];

  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const duration = 1000; // animation duration in ms
    const steps = 30; // number of animation steps

    const interval = setInterval(() => {
      setAnimatedValues((prev) =>
        prev.map((val, i) => {
          const target = values[i];
          const increment = target / steps;
          const next = val + increment;
          return next >= target ? target : next;
        })
      );
    }, duration / steps);

    return () => clearInterval(interval);
  }, [stats]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {labels.map((label, i) => (
        <div
          key={i}
          className={`rounded-2xl shadow-lg hover:shadow-xl transition p-5 ${colors[i]} flex flex-col items-center justify-center space-y-2`}
        >
          <div className="text-3xl">{icons[i]}</div>
          <div className="text-sm uppercase tracking-wide font-semibold">
            {label}
          </div>
          <div className="text-2xl font-bold">
            {Math.round(animatedValues[i])}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
