"use client";

import { Tabs } from "antd";
import { JSX } from "react";

const NavPills = ({
  tabs,
}: {
  tabs: {
    key: string;
    label: string;
    content: JSX.Element;
    onClick?: () => void;
    disabled?: boolean;
  }[];
}) => {
  const handleTabClick = (key: string) => {
    const clickedTab = tabs.find((tab) => tab.key === key);
    if (clickedTab?.onClick) {
      clickedTab.onClick();
    }
  };

  return (
    <Tabs
      defaultActiveKey="overview"
      onTabClick={handleTabClick}
      items={tabs.map((tab) => ({
        key: tab.key,
        label: tab.label,
        children: tab.content,
        disabled: tab.disabled,
      }))}
    />
  );
};

export default NavPills;
