"use client";

import { useProjectData } from "@/shared/hooks/useProjectData";
import { useEffect } from "react";

export const Project = () => {
  const { getProjectById } = useProjectData();

  const getProjectData = async (id: string) => {
    const response = await getProjectById(id);
    console.log(response);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (id) {
      getProjectData(id);
    }
  }, []);

  return (
    <div>
      <p>olá mundo!</p>
    </div>
  );
};
