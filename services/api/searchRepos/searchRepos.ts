// api doc: https://docs.github.com/en/rest/search#search-repositories

import {
  TSearchRepos,
  TSearchReposParams,
  TSearchReposResponse,
} from "./types";

export function searchRepos(params: TSearchReposParams) {
  if (!validateParam(params)) return Promise.reject();

  const { q, page } = params; 
  const reposRes = fetch(`https://api.github.com/search/repositories?q=${q}&page=${page}`)
    .then((res) => res.json())
    .then((d) => normalizeSearchRepoResponse(params, d));
  return reposRes;
}

function validateParam({ q }: TSearchReposParams) {
  if (!q) return false;
  return true;
}

function normalizeSearchRepoResponse(
  params: TSearchReposParams,
  response: TSearchReposResponse
): TSearchRepos {
  const { page } = params;
  const pageCount = response.total_count / 30;
  const currentPage = page ?? 1;
  const nextPage = currentPage < pageCount ? currentPage + 1 : undefined;

  return {
    nextPage, 
    totalCount: response.total_count,
    incompleteResults: response.incomplete_results,
    items: Array.from(response.items, (repoItem) => ({
      id: repoItem.id,
      private: repoItem.private,
      fullName: repoItem.full_name,
      htmlUrl: repoItem.html_url,
      description: repoItem.description ?? "",
      stargazersCount: repoItem.stargazers_count,
      stargazersUrl: repoItem.stargazers_url,
      language: repoItem.language || "",
      pushedAt: repoItem.pushed_at,
      topics: Array.from(repoItem.topics || []),
    })),
  };
}
