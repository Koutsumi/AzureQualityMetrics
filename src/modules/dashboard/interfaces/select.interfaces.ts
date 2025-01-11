export interface ISelectDataDTO {
  id: string;
  name: string;
}

export interface IProjectResponse {
  error?: string;
  data?: ISelectDataDTO[];
}