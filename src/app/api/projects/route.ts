import { NextResponse } from "next/server";
import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";

export async function GET() {
  const organizationUrl = process.env.AZURE_DEVOPS_ORG_URL;
  const token = process.env.AZURE_DEVOPS_ACCESS_TOKEN;

  if (!organizationUrl || !token) {
    console.error("Missing environment variables");
    return NextResponse.json(
      { error: "Missing environment variables" },
      { status: 500 }
    );
  }

  try {
    console.log("Connecting to Azure DevOps...");
    const authHandler = getPersonalAccessTokenHandler(token);
    const connection = new WebApi(organizationUrl, authHandler);

    console.log("Fetching Core API...");
    const coreApi = await connection.getCoreApi();

    console.log("Retrieving projects...");
    const projects = await coreApi.getProjects();

    console.log("Projects retrieved:", projects);
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error: any) {
    console.error("Error occurred:", error.message || error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
