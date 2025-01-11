"use server";

import { getAzureDevOpsConnection } from "@/app/api/utils/azureConnection";
import { IProjectResponse } from "../interfaces/select.interfaces";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

const organizationUrl = process.env.AZURE_DEVOPS_ORG_URL;
const token = process.env.AZURE_DEVOPS_ACCESS_TOKEN;

export const getProjects = async (): Promise<IProjectResponse> => {
  if (!organizationUrl || !token) {
    return {
      error: "Variáveis incorretas",
    };
  }

  try {
    const client = getAzureDevOpsConnection(organizationUrl, token);
    const coreApi = await client.getCoreApi();
    const projects = await coreApi.getProjects();

    return {
      data: projects.map((project) => ({
        id: project.id || "",
        name: project.name || "",
      })),
    };
  } catch (error) {
    return {
      error: getErrorMessage(error, "Erro ao buscar projetos"),
    };
  }
};

export const getSprints = async (
  projectId: string
): Promise<IProjectResponse> => {
  if (!organizationUrl || !token) {
    return {
      error: "Variáveis de ambiente incorretas",
    };
  }

  try {
    const client = getAzureDevOpsConnection(organizationUrl, token);
    const workApi = await client.getWorkApi();

    const teamContext = { projectId };

    const iterations = await workApi.getTeamIterations(teamContext);

    return {
      data: iterations.map((iteration) => ({
        id: iteration.id || "",
        name: iteration.name || "",
      })),
    };
  } catch (error) {
    console.error("Erro ao buscar sprints:", error);
    return {
      error: getErrorMessage(error, "Erro ao buscar sprints"),
    };
  }
};
