"use server";

import { NextResponse } from "next/server";
import { getAzureDevOpsConnection } from "../../../utils/azureConnection";
import type { NextRequest } from "next/server";
import type { GitApi } from "azure-devops-node-api/GitApi";
import type {
  GitPullRequest,
  GitRepository,
} from "azure-devops-node-api/interfaces/GitInterfaces";

interface PullRequestProps {
  repository: string;
  pullRequests: GitPullRequest[];
}

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
    const gitApi: GitApi = await connection.getGitApi();

    const repositories: GitRepository[] = await gitApi.getRepositories();

    const pullRequests: PullRequestProps[] = await Promise.all(
      repositories
        .filter((repo) => repo.project?.id === projectId)
        .map(async (repo) => {
          const repositoryName = repo.name || "Unknown Repository";
          const prs = await gitApi.getPullRequests(repo.id!, { status: 1 });
          return { repository: repositoryName, pullRequests: prs };
        })
    );

    return NextResponse.json({ pullRequests }, { status: 200 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Pull requests not found";
    return NextResponse.json({ error: errorMessage }, { status: 404 });
  }
}
