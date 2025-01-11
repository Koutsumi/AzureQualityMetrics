"use client";

import NavPills from "@/components/NavPills.tsx";
import StatCard from "@/components/Cards/Start.Card";
import BugsBySeverityChart from "@/components/Charts/BugsBySeverityChart";
import { Bug, Check, CheckCircle, XCircle } from "lucide-react";
import { HeaderComponent } from "@/components/Header/index";

export const Dashboard = () => {
  const tabs = [
    {
      key: "overview",
      label: "Visão Geral",
      content: (
        <div className="space-y-6">
          <div className="flex space-x-6">
            <StatCard title="Total de Bugs" count={150} icon={Bug} />
            <StatCard title="Bugs Críticos" count={50} icon={XCircle} />
            <StatCard title="Inconsistências" count={30} icon={CheckCircle} />
            <StatCard title="Taxa de Aprovação" count={85} icon={Check} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <BugsBySeverityChart
              data={[
                { name: "Critical", value: 50 },
                { name: "High", value: 60 },
              ]}
            />
            {/* Add BugsByDeveloperChart */}
          </div>
        </div>
      ),
    },
    {
      key: "tests",
      label: "Testes",
      content: <div>{/* Add TestResultsChart */}</div>,
    },
    {
      key: "bugs",
      label: "Bugs",
      content: <div>{/* Add BugTrendsChart and BugDetailsTable */}</div>,
    },
    {
      key: "inconsistencies",
      label: "Inconsistências",
      content: <div>{/* Add inconsistencies chart */}</div>,
    },
  ];

  return (
    <div className="min-h-screen">
      <HeaderComponent />
      <div className="px-6 py-4">
        <NavPills tabs={tabs} />
      </div>
    </div>
  );
};
