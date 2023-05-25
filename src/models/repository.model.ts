export interface IRepository {
  id: string;
  name: string;
  pushedAt: string;
  stargazers: {
    totalCount: number;
  };
  owner: {
    login: string;
  };
  url: string;
}

export interface IPageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export interface IVariables {
  queryString: string;
  first: number;
  after?: string | null;
  before?: string | null;
}

export interface IRepositoryDetails {
  description: string;
  id: string;
  languages: {
    nodes?: {
      id: string,
      name: string,
    }[];
  };
  name: string;
  url: string;
  owner: {
    avatarUrl: string;
    id: string;
    login: string;
    url: string;
  };
  pushedAt: string;
  stargazerCount: number;
}
