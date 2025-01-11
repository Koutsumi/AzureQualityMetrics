import { NextResponse } from "next/server";
import { getAzureDevOpsConnection } from "../../../utils/azureConnection";
import { fetchWorkItems } from "../../../utils/fetchHelpers";
import type { NextRequest } from "next/server";
import type { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
): Promise<Response> {
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
    const workItemTrackingApi: WorkItemTrackingApi =
      await connection.getWorkItemTrackingApi();

    const workItems = await fetchWorkItems(workItemTrackingApi, projectId);
    return NextResponse.json({ workItems }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Work items not found";
    return NextResponse.json({ error: errorMessage }, { status: 404 });
  }
}
