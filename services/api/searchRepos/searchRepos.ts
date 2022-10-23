// api doc: https://docs.github.com/en/rest/search#search-repositories

import { ApiParamError } from "../../errors";
import { ApiResponseError } from "../../errors/ApiResponseError";
import {
  TSearchRepos,
  TSearchReposParams,
  TSearchReposResponse,
  TSearchRepoErrResponse,
} from "./types";

export default function searchRepos(params: TSearchReposParams) {
  if (!validateParam(params))
    return Promise.reject(new ApiParamError("empty query string", params));

  const { q, page } = params;
  const reposRes = fetch(
    `https://api.github.com/search/repositories?q=${q}&page=${page}`
  )
    .then(async (res) => {
      const data: TSearchReposResponse | TSearchRepoErrResponse = await res.json();

      if (!res.ok) {
        const errResponse = data as TSearchRepoErrResponse;
        const msg = [errResponse.message, errResponse.documentation_url].join(" ");
        return Promise.reject(new ApiResponseError(msg, data));
      }

      return data as TSearchReposResponse;
    })
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
