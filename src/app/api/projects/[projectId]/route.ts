"use server";

import { NextResponse } from "next/server";
import { getAzureDevOpsConnection } from "../../utils/azureConnection";

export async function GET(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const { projectId } = params;
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

    const project = await coreApi.getProject(projectId);

    return NextResponse.json({ project }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Pull requests not found";
    return NextResponse.json({ error: errorMessage }, { status: 404 });
  }
}
