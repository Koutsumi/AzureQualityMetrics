import { useState } from "react";

import { useToast } from "@/shared/contexts/toast.context";
import { getSprints } from "@/modules/dashboard/actions/selects.actions";
import { ISelectDataDTO } from "@/modules/dashboard/interfaces/select.interfaces";

export const useSprintData = () => {
  const { toast } = useToast();

  const [selectedSprints, setSelectedSprints] = useState<ISelectDataDTO[]>([]);
  const [selecteSprint, setSelectSprint] = useState<ISelectDataDTO>();

  const getSprintsData = async (projectId: string) => {
    if (!projectId) {
      toast.info("Necessário selecionar um projeto");
      return;
    }

    const response = await getSprints(projectId);

    if (response.error) {
      return toast.error(response.error);
    }

    setSelectedSprints(response.data || []);
  };

  const onSprintChange = (value: ISelectDataDTO) => {
    setSelectSprint(value);
  };

  const getLastSprint = async (value: string) => {
    await getSprintsData(value);

    const lastSprint: ISelectDataDTO | undefined = selectedSprints
      ? selectedSprints[selectedSprints.length - 1]
      : undefined;

    setSelectSprint(lastSprint);
  };

  return {
    selectedSprints,
    selecteSprint,
    getSprintsData,
    onSprintChange,
    getLastSprint,
  };
};
