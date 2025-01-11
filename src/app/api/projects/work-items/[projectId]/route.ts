import { NextResponse } from "next/server";
import { getAzureDevOpsConnection } from "../../../utils/azureConnection";
import { fetchWorkItems } from "../../../utils/fetchHelpers";

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
    const workItemTrackingApi = await connection.getWorkItemTrackingApi();

    const workItems = await fetchWorkItems(workItemTrackingApi, projectId);
    return NextResponse.json({ workItems }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Work items not found" },
      { status: 404 }
    );
  }
}
