export interface ISelectDataDTO {
  id: string;
  name: string;
}

export interface IProjectResponse {
  error?: string;
  data?: ISelectDataDTO[];
  project?: IProject;
  members?: IProjectWithMembers[] | undefined;
}

export interface ISprintResponse {
  data?: {
    id: string;
    name: string;
    startDate?: string;
    finishDate?: string;
    timeFrame?: string;
  };
  error?: string;
}

export interface IProject {
  id: string;
  name: string;
  url: string;
  state: string;
  revision: number;
  visibility: ProjectVisibility | unknown;
  lastUpdateTime: string;
  defaultTeam: IDefaultTeam;
  _links: IProjectLinks;
}

export enum ProjectVisibility {
  Private = 0,
  Public = 1,
}

export interface IProjectLinks {
  self: ILink;
  collection: ILink;
  web: ILink;
}

export interface ILink {
  href: string;
}

export interface IDefaultTeam {
  id: string;
  name: string;
  url: string;
}

export interface IProjectWithMembers {
  projectId: string;
  projectName: string;
  teams: ITeamWithMembers[];
  error?: string;
}

export interface IProjectMembersResponse {
  data?: IProjectWithMembers[];
  error?: string;
}

interface IIdentity {
  id: string;
  displayName: string;
  uniqueName: string;
  inactive?: boolean;
}

export interface IMember {
  identity?: IIdentity;
  id: string;
  name?: string;
}

export interface ITeam {
  projectId: string;
  id: string;
  name?: string;
}

export interface ITeamWithMembers {
  teamName: string;
  members: Array<{
    id: string;
    displayName: string;
    email: string;
    generalData: IGeneralData;
  }>;
}

export interface IGeneralData {
  descriptor: string;
  displayName: string;
  id: string;
  imageUrl: string;
  uniqueName: string;
  url: string;
  _links: {
    avatar: {
      href: string;
    };
  };
}

export interface ITeamWithMember {
  teamName?: string;
  id: string;
  displayName: string;
  email: string;
  generalData: {
    descriptor: string;
    displayName: string;
    id: string;
    imageUrl: string;
    uniqueName: string;
    url: string;
    _links: {
      avatar: {
        href: string;
      };
    };
  };
}
