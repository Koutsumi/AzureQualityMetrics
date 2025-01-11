"use client";

import React from "react";
import { Select } from "antd";
import { ISelectDataDTO } from "@/modules/dashboard/interfaces/select.interfaces";

interface SprintSelectProps {
  sprints: ISelectDataDTO[];
  onChange: (value: ISelectDataDTO) => void;
  onClick: () => void;
}

const SprintSelect: React.FC<SprintSelectProps> = ({
  sprints,
  onChange,
  onClick,
}) => {
  const sprintOptions = Array.isArray(sprints)
    ? sprints.map((sprint) => ({
        label: sprint.name,
        value: sprint.id,
      }))
    : [];

  return (
    <Select
      placeholder="Select Sprint"
      options={sprintOptions}
      onChange={onChange}
      onClick={onClick}
      className="w-40"
    />
  );
};

export default SprintSelect;
