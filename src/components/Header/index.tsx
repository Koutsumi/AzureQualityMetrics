import { useState } from "react";
import { useToast } from "@/shared/contexts/toast.context";
import Header from "./component";
import {
  getProjects,
  getSprints,
} from "@/modules/dashboard/actions/selects.actions";
import { ISelectDataDTO } from "@/modules/dashboard/interfaces/select.interfaces";

export const HeaderComponent: React.FC = () => {
  const { toast } = useToast();
  const [selectedProjects, setSelectedProjects] = useState<ISelectDataDTO[]>(
    []
  );
  const [selectProject, setSelectProject] = useState<string>("");
  const [selectedSprints, setSelectedSprints] = useState<ISelectDataDTO[]>([]);
  const [selecteSprint, setSelectSprint] = useState<ISelectDataDTO>();

  const getProjectsData = async () => {
    const response = await getProjects();

    if (response.error) {
      return toast.error(response.error);
    }

    setSelectedProjects(response.data || []);
  };

  const onProjectChange = (value: string) => {
    setSelectProject(value);
  };

  const getSprintsData = async (projectId: string) => {
    const response = await getSprints(projectId);

    if (response.error) {
      return toast.error(response.error);
    }

    setSelectedSprints(response.data || []);
  };

  const onSprintChange = (value: ISelectDataDTO) => {
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
