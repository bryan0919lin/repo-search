import React, {
  ChangeEvent,
  useState,
  UIEvent,
  useRef,
  useEffect,
} from "react";
import Head from "next/head";
import { useDebounce, useInfiniteQuery } from "../../hooks";
import { searchRepos } from "../../services/api";
import {
  TSearchRepoItem,
  TSearchRepos,
  TSearchReposParams,
} from "../../services/api/types";
import RepoList from "../../components/RepoList/RepoList";
import RepoItem, {
  TRepoItemProps,
} from "../../components/RepoList/components/RepoItem";
import {
  mainBoxStyle,
  searchBarStyle,
  repoListStyle,
  footerStyle,
} from "./styles";
import FilterBar from "./components/FilterBar";
import Footer from "./components/Footer";
import { useToast } from "../../hooks/useToast";
import { ApiResponseError } from "../../services/errors/ApiResponseError";

type TSearchRepoProps = {
  title: string;
};

/**
 * This component is for the whole home page to have the ability for search
 * repo from GitHub by query string, then display result with infinite scroll
 * to get next page appended to result list.
 *
 * The search repo api of GitHub still have other params, such as sort.
 * Will implement the entire functionalities in the future.
 *
 * @returns search repo page impelmentation
 */
export default function SearchRepo({ title }: TSearchRepoProps) {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 500);
  const params = { q: debouncedText };
  const ref = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const { data, isLoading, hasNext, fetchNext, error } = useInfiniteQuery<
    TSearchRepos,
    TSearchReposParams
  >({
    queryKey: JSON.stringify(params),
    queryFn: (pageParam = params) =>
      searchRepos(pageParam) as Promise<TSearchRepos>,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.nextPage) return;
      return {
        ...params,
        page: lastPage.nextPage,
      };
    },
  });

  const allRepoItems = ([] as TSearchRepoItem[]).concat(
    ...(data || []).map((res) => res?.items || [])
  );

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const scrollSize = Math.floor(
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop
    );
    const isBottom = scrollSize === e.currentTarget.clientHeight;
    isBottom && hasNext && fetchNext();
  };

  useEffect(() => {
    if (!error || !(error instanceof ApiResponseError)) return;

    toast("error", error.message);
  }, [error]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={mainBoxStyle}>
        <h1>{title}</h1>

        <FilterBar
          text={text}
          handleTextChange={handleTextChange}
          data={data || []}
          style={searchBarStyle}
        />

        <div ref={ref} style={repoListStyle}>
          <RepoList
            items={allRepoItems}
            itemHeight={80}
            onScroll={handleScroll}
            style={{
              height: ref.current?.clientHeight ?? 0,
              color: "rgba(0, 0, 0, 0.87)",
              backgroundColor: "#fafafa",
            }}
          >
            {({ index, style, data, ref }: TRepoItemProps & { ref?: any }) => (
              <RepoItem
                key={data[index].id}
                ref={ref}
                index={index}
                style={style}
                data={data}
              />
            )}
          </RepoList>
        </div>

        <Footer
          isLoading={isLoading}
          hasNext={hasNext}
          data={data}
          style={footerStyle}
        />
      </div>
    </>
  );
}
