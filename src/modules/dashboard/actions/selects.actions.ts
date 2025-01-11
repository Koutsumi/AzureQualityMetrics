"use server";

import { getAzureDevOpsConnection } from "@/app/api/utils/azureConnection";
import { ISelectInterface } from "../interfaces/select.interfaces";

const organizationUrl = process.env.AZURE_DEVOPS_ORG_URL;
const token = process.env.AZURE_DEVOPS_ACCESS_TOKEN;

export const getProjects = async (): Promise<ISelectInterface[]> => {
  if (!organizationUrl || !token) {
    throw new Error("Missing environment variables");
  }

  try {
    const client = getAzureDevOpsConnection(organizationUrl, token);
    const coreApi = await client.getCoreApi();
    const projects = await coreApi.getProjects();

    return projects.map((project) => ({
      id: project.id || "",
      name: project.name || "",
    }));
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    throw new Error("Falha ao obter projetos");
  }
};

export const getSprints = async (
  projectId: string
): Promise<ISelectInterface[]> => {
  if (!organizationUrl || !token) {
    throw new Error("Missing environment variables");
  }

  try {
    const client = getAzureDevOpsConnection(organizationUrl, token);
    const workApi = await client.getWorkApi();

    const teamContext = { projectId };

    console.log("Fetching sprints for project:", teamContext);

    const iterations = await workApi.getTeamIterations(teamContext);

    if (!iterations || !Array.isArray(iterations)) {
      console.warn("No iterations found for project:", projectId);
      return [];
    }

    return iterations.map((iteration) => ({
      id: iteration.id || "",
      name: iteration.name || "",
    }));
  } catch (error) {
    console.error("Erro ao buscar sprints:", error);
    throw new Error("Falha ao obter sprints");
  }
};
