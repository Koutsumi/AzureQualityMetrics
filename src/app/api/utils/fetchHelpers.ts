import type { WorkItemTrackingApi } from "azure-devops-node-api/WorkItemTrackingApi";
import type {
  WorkItemQueryResult,
  WorkItemReference,
  WorkItem,
} from "azure-devops-node-api/interfaces/WorkItemTrackingInterfaces";

export async function fetchWorkItems(
  workItemTrackingApi: WorkItemTrackingApi,
  projectName: string
): Promise<WorkItem[]> {
  const query = {
    query: `SELECT [System.Id], [System.Title], [System.State]
            FROM WorkItems
            WHERE [System.TeamProject] = '${projectName}'`,
  };

  const queryResult: WorkItemQueryResult =
    await workItemTrackingApi.queryByWiql(query);

  if (!queryResult.workItems || queryResult.workItems.length === 0) {
    return [];
  }

  return await Promise.all(
    queryResult.workItems
      .filter(
        (item): item is WorkItemReference & { id: number } =>
          item.id !== undefined
      )
      .map(async (item) => {
        return await workItemTrackingApi.getWorkItem(item.id);
      })
  );
}
