import { Tabs } from "antd";
import { JSX } from "react";

const NavPills = ({
  tabs,
}: {
  tabs: { key: string; label: string; content: JSX.Element }[];
}) => <Tabs defaultActiveKey="overview" items={tabs} />;

export default NavPills;
