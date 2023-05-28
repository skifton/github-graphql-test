// githubAPI.ts
import axios from "axios";
import { IVariables } from "../models/repository.model";

const BASE_URL = "https://api.github.com/graphql";
const TOKEN = import.meta.env.VITE_REACT_APP_GITHUB_API_KEY;

export const getGithubRepositories = async (variables: IVariables) => {
  const query = `
    query($queryString: String!, $first: Int!, $after: String) {
      search(query: $queryString, type: REPOSITORY, first: $first, after: $after) {
        repositoryCount
        pageInfo {
          startCursor
          hasNextPage
          endCursor
        }
        nodes {
          ... on Repository {
            id
            name
            stargazers {
              totalCount
            }
            owner {
              login
            }
            pushedAt
            url
          }
        }
      }
    }
  `;

  return axios.post(
    BASE_URL,
    {
      query,
      variables,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};

export const getCurrentUserRepositories = async (variables: IVariables) => {
  const query = `
    query($first: Int!, $after: String, $before: String) {
      viewer {
        repositories(first: $first, after: $after, before: $before) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ... on Repository {
                id
                name
                stargazers {
                  totalCount
                }
                owner {
                  login
                }
                pushedAt
                url
              }
          }
        }
      }
    }
  `;

  return axios.post(
    BASE_URL,
    {
      query,
      variables,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};

export const getRepositoryDetails = async (owner: string, name: string) => {
  const query = `
  query GetRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      stargazerCount
      pushedAt
      owner {
        id
        avatarUrl
        login
        url
      }
      url
      languages(first: 10) {
        nodes {
          id
          name
        }
      }
      description
    }
  }
`;
  const variables = {
    name,
    owner,
  };

  return axios.post(
    BASE_URL,
    {
      query,
      variables,
    },
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }
  );
};
