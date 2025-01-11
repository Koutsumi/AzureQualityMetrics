export async function fetchProjects(coreApi: any) {
  return await coreApi.getProjects();
}

export async function fetchWorkItems(
  workItemTrackingApi: any,
  projectName: string
) {
  const query = {
    query: `SELECT [System.Id], [System.Title], [System.State]
              FROM WorkItems
              WHERE [System.TeamProject] = '${projectName}'`,
  };
  const queryResult = await workItemTrackingApi.queryByWiql(query);

  return await Promise.all(
    queryResult.workItems.map(async (item: any) => {
      return await workItemTrackingApi.getWorkItem(item.id);
    })
  );
}

export async function fetchPullRequests(gitApi: any) {
  const repositories = await gitApi.getRepositories();

  return await Promise.all(
    repositories.map(async (repo: any) => {
      const prs = await gitApi.getPullRequests(repo.id, { status: 1 }); // Status 1: Active
      return { repository: repo.name, pullRequests: prs };
    })
  );
}
