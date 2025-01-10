import { NextResponse } from "next/server";
import { getAzureDevOpsConnection } from "../utils/azureConnection";
import { fetchProjects } from "../utils/fetchHelpers";

export async function GET() {
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

    const projects = await fetchProjects(coreApi);
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
