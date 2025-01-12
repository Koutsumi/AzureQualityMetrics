import { useState } from "react";

import { useToast } from "@/shared/contexts/toast.context";
import {
  getProjectById,
  getProjects,
} from "@/modules/dashboard/actions/selects.actions";
import {
  IProjectWithMembers,
  ISelectDataDTO,
} from "@/modules/dashboard/interfaces/select.interfaces";

export const useProjectData = () => {
  const { toast } = useToast();

  const [selectedProjects, setSelectedProjects] = useState<ISelectDataDTO[]>(
    []
  );
  const [selectProject, setSelectProject] = useState<string>("");
  const [selectMembersFromAllTeams, setSelectMembersFromAllTeams] = useState<
    IProjectWithMembers[]
  >([]);

  const getProjectsData = async () => {
    const response = await getProjects();

    if (response.error) {
      return toast.error(response.error);
    }

    setSelectedProjects(response.data || []);
    setSelectMembersFromAllTeams(response.members || []);
  };

  const getProjectByIdData = async (id: string) => {
    const response = await getProjectById(id);
  };

  const onClickedSelectAreaProject = async () => {
    if (selectProject) return;
    toast.warning("Carregando projetos");
    await getProjectsData();
    toast.success("Selecione um projeto");
    return;
  };

  return {
    selectedProjects,
    selectProject,
    getProjectsData,
    getProjectByIdData,
    setSelectProject,
    selectMembersFromAllTeams,
    onClickedSelectAreaProject,
    getProjectById,
  };
};
