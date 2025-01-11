"use client";

import { ISelectDataDTO } from "@/modules/dashboard/interfaces/select.interfaces";
import { Select } from "antd";

interface ProjectSelectProps {
  projects: ISelectDataDTO[];
  onChange: (value: string) => void;
  onClick: () => void;
}

const ProjectSelect: React.FC<ProjectSelectProps> = ({
  projects,
  onChange,
  onClick,
}) => {
  const options = Array.isArray(projects)
    ? projects.map((project: ISelectDataDTO) => ({
        label: project.name,
        value: project.id,
      }))
    : [];

  return (
    <Select
      placeholder="Select Project"
      options={options}
      onChange={onChange}
      onClick={onClick}
      className="w-40"
    />
  );
};

export default ProjectSelect;
