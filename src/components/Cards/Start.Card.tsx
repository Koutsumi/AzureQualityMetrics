import { Icon, LucideIcon, LucideProps } from "lucide-react";
import { JSX } from "react";

const StatCard = ({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: any;
}) => (
  <div className="bg-white p-4 rounded shadow w-1/4">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-gray-600">{title}</h4>
        <h2 className="text-2xl font-bold">{count}</h2>
      </div>
      <Icon className="text-blue-500 w-8 h-8" iconNode={[icon]} />
    </div>
  </div>
);

export default StatCard;
