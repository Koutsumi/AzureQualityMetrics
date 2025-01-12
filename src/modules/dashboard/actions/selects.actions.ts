"use server";

import { getAzureDevOpsConnection } from "@/app/api/utils/azureConnection";
import {
  IDefaultTeam,
  IGeneralData,
  IProjectResponse,
  IProjectWithMembers,
  ISelectDataDTO,
  ISprintResponse,
  ITeamWithMembers,
  ProjectVisibility,
} from "../interfaces/select.interfaces";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

const organizationUrl = process.env.AZURE_DEVOPS_ORG_URL;
const token = process.env.AZURE_DEVOPS_ACCESS_TOKEN;

const getMembers = async (
  projects: ISelectDataDTO[]
): Promise<(IProjectWithMembers | { error: string })[]> => {
  if (!organizationUrl || !token) {
    return [{ error: "Variáveis incorretas" }];
  }

  const client = getAzureDevOpsConnection(organizationUrl, token);
  const coreApi = await client.getCoreApi();

  return await Promise.all(
    projects.map(async (project) => {
      try {
        const teams = await coreApi.getTeams(project.id);
        const teamMembers: ITeamWithMembers[] = await Promise.all(
          teams.map(async (team) => {
            const members = await coreApi.getTeamMembersWithExtendedProperties(
              team.projectId || "",
              team.id || ""
            );

            return {
              teamName: team.name || "Equipe sem nome",
              members: members.map((member) => ({
                id: member?.identity?.id || "",
                displayName:
                  member?.identity?.displayName || "Nome não disponível",
                email: member?.identity?.uniqueName || "Email não disponível",
                generalData: member?.identity as IGeneralData,
              })),
            };
          })
        );

        return {
          projectId: project.id,
          projectName: project.name,
          teams: teamMembers,
        };
      } catch (error) {
        return {
          error: getErrorMessage(error, "Erro ao buscar membros"),
        };
      }
    })
  );
};

export const getProjects = async (): Promise<IProjectResponse> => {
  if (!organizationUrl || !token) {
    return {
      error: "Variáveis incorretas",
    };
  }

  try {
    const client = getAzureDevOpsConnection(organizationUrl, token);
    const coreApi = await client.getCoreApi();
    const rawProjects = await coreApi.getProjects();
    const projects: ISelectDataDTO[] = rawProjects.map((project) => ({
      id: project.id || "default-id",
      name: project.name || "Nome não disponível",
    }));

    const rawMembers = await getMembers(projects);

    const members: IProjectWithMembers[] = rawMembers.filter(
      (item): item is IProjectWithMembers => !("error" in item)
    );

    return {
      data: projects,
      members,
    };
  } catch (error) {
    return {
      error: getErrorMessage(error, "Erro ao buscar projetos"),
    };
  }
};

export const getProjectById = async (id: string): Promise<IProjectResponse> => {
  if (!organizationUrl || !token) {
    return {
      error: "Variáveis incorretas",
    };
  }

  try {
    const client = getAzureDevOpsConnection(organizationUrl, token);
    const coreApi = await client.getCoreApi();
    const project = await coreApi.getProject(id);

    return {
      project: {
        id: project.id || "",
        name: project.name || "",
        url: project.url || "",
        state: project.state || "",
        revision: project.revision || 0,
        visibility: project.visibility || ProjectVisibility.Private,
        lastUpdateTime: project.lastUpdateTime?.toString() || "",
        defaultTeam: project.defaultTeam as IDefaultTeam,
        _links: project._links || "",
      },
    };
  } catch (error) {
    return {
      error: getErrorMessage(error, "Erro ao buscar este projeto"),
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

export const getSprintById = async (
  projectId: string,
  sprintId: string
): Promise<ISprintResponse> => {
  if (!organizationUrl || !token) {
    return {
      error: "Variáveis de ambiente incorretas.",
    };
  }

  try {
    const client = getAzureDevOpsConnection(organizationUrl, token);
    const workApi = await client.getWorkApi();

    const teamContext = { projectId };

    const sprint = await workApi.getTeamIteration(teamContext, sprintId);

    return {
      data: {
        id: sprint.id || "",
        name: sprint.name || "",
        startDate: sprint.attributes?.startDate?.toString() || "",
        finishDate: sprint.attributes?.finishDate?.toString() || "",
        timeFrame: sprint.attributes?.timeFrame?.toString() || "",
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados da sprint:", error);
    return {
      error: getErrorMessage(error, "Erro ao buscar dados da sprint"),
    };
  }
};
