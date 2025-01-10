import { NextResponse } from "next/server";
import { getAzureDevOpsConnection } from "../../../utils/azureConnection";
import { fetchPullRequests } from "../../../utils/fetchHelpers";

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
    const gitApi = await connection.getGitApi();

    const repositories = await gitApi.getRepositories();
    const pullRequests = await Promise.all(
      repositories
        .filter((repo: any) => repo.project.id === projectId)
        .map(async (repo: any) => {
          const prs = await gitApi.getPullRequests(repo.id, { status: 1 });
          return { repository: repo.name, pullRequests: prs };
        })
    );

    return NextResponse.json({ pullRequests }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Pull requests not found" },
      { status: 404 }
    );
  }
}
