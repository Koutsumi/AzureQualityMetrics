import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";

export function getAzureDevOpsConnection(
  organizationUrl: string,
  token: string
): WebApi {
  const authHandler = getPersonalAccessTokenHandler(token);
  return new WebApi(organizationUrl, authHandler);
}
