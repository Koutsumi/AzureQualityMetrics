// Tipos para erros do Azure DevOps
interface AzureDevOpsErrorResponse {
  errors?: Record<string, string>;
}

interface AzureDevOpsError {
  response?: {
    data: AzureDevOpsErrorResponse;
  };
}

export const getErrorMessage = (
  error: unknown,
  fallbackMessage: string
): string => {
  if (isAzureDevOpsError(error)) {
    const errors = error.response?.data.errors;
    if (errors && Object.keys(errors).length > 0) {
      return errors[Object.keys(errors)[0]];
    }
  }

  return fallbackMessage;
};

const isAzureDevOpsError = (error: unknown): error is AzureDevOpsError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as AzureDevOpsError).response?.data === "object"
  );
};
