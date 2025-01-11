"use server";

import { NextResponse } from "next/server";
import { WebApi, getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { TeamProjectReference } from "azure-devops-node-api/interfaces/CoreInterfaces";

interface Project {
  id: string;
  name: string;
}

function getAzureDevOpsConnection(
  organizationUrl: string,
  token: string
): WebApi {
  const authHandler = getPersonalAccessTokenHandler(token);
  return new WebApi(organizationUrl, authHandler);
}

export async function GET(): Promise<NextResponse> {
  const organizationUrl = process.env.AZURE_DEVOPS_ORG_URL;
  const token = process.env.AZURE_DEVOPS_ACCESS_TOKEN;

  if (!organizationUrl || !token) {
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 }
    );
  }

  try {
    const connection = getAzureDevOpsConnection(organizationUrl, token);

    const coreApi = await connection.getCoreApi();

    const teamProjects: TeamProjectReference[] = await coreApi.getProjects();

    const projects: Project[] = teamProjects
      .filter((project) => project.id && project.name)
      .map((project) => ({
        id: project.id!,
        name: project.name!,
      }));

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
