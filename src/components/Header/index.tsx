import { useState } from "react";
import Header from "./component";
import {
  getProjects,
  getSprints,
} from "@/modules/dashboard/actions/selects.actions";
import { ISelectInterface } from "@/modules/dashboard/interfaces/select.interfaces";

export const HeaderComponent: React.FC = () => {
  const [selectedProjects, setSelectedProjects] = useState<ISelectInterface[]>(
    []
  );
  const [selectProject, setSelectProject] = useState<string>("");
  const [selectedSprints, setSelectedSprints] = useState<ISelectInterface[]>(
    []
  );
  const [selecteSprint, setSelectSprint] = useState<ISelectInterface>();

  const getProjectsData = async () => {
    const response = await getProjects();
    setSelectedProjects(response);
  };

  const onProjectChange = (value: string) => {
    setSelectProject(value);
  };

  const getSprintsData = async (projectId: string) => {
    const response = await getSprints(projectId);
    setSelectedSprints(response);
  };

  const onSprintChange = (value: ISelectInterface) => {
    setSelectSprint(value);
  };

  return (
    <Header
      projects={selectedProjects}
      sprints={selectedSprints}
      onProjectChange={onProjectChange}
      onSprintChange={onSprintChange}
      onClickProjectSelect={getProjectsData}
      onClickSprintSelect={() => getSprintsData(selectProject)}
    />
  );
};
