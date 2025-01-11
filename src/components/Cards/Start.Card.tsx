"use client";

import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  count: number;
  icon: LucideIcon;
};

const StatCard: React.FC<StatCardProps> = ({ title, count, icon: Icon }) => (
  <div className="bg-white p-4 rounded shadow w-1/4">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-gray-600">{title}</h4>
        <h2 className="text-2xl font-bold">{count}</h2>
      </div>
      <Icon className="text-blue-500 w-8 h-8" />
    </div>
  </div>
);

export default StatCard;
