import React, {
  ChangeEvent,
  useState,
  UIEvent,
  CSSProperties,
  useRef,
  useEffect,
} from "react";
import Head from "next/head";
import { useDebounce, useInfiniteQuery } from "../hooks";
import { searchRepos } from "../services/api";
import {
  TSearchRepoItem,
  TSearchRepos,
  TSearchReposParams,
} from "../services/api/types";
import RepoList from "../components/RepoList/RepoList";
import RepoItem, { TRepoItemProps } from "../components/RepoList/components/RepoItem";

export default function Home() {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text);
  const params = { q: debouncedText };
  const ref = useRef<HTMLDivElement>(null);

  const { data, isLoading, hasNext, fetchNext } = useInfiniteQuery<
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

  const totalCount = data?.slice(-1)[0].totalCount;
  const allRepoItems = ([] as TSearchRepoItem[]).concat(
    ...(data || []).map((res) => res?.items || [])
  );

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const isBottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    isBottom && hasNext && fetchNext();
  };

  return (
    <>
      <Head>
        <title>Search repos from GitHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={mainBoxStyle}>
        <div style={searchBarStyle}>
          <h1>Search repos from GitHub</h1>
          repo search:{" "}
          <input type="text" value={text} onChange={handleTextChange} />
          {totalCount && <span>total count: {totalCount}</span>}
          {isLoading && <span>loading...</span>}
        </div>
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
              <RepoItem key={data[index].id} ref={ref} index={index} style={style} data={data} />
            )}
          </RepoList>
        </div>
        <div style={footerStyle}>
          Please scroll down to the bottom of list to fetch more data.
        </div>
      </div>
    </>
  );
}

const mainBoxStyle: CSSProperties = {
  display: "flex",
  flexFlow: "column",
  height: "calc(100vh - 16px)",
};

const searchBarStyle: CSSProperties = {
  flex: "0 1 auto",
};

const repoListStyle: CSSProperties = {
  flex: "1 1 auto",
};

const footerStyle: CSSProperties = {
  textAlign: "center",
  flex: "0 1 20px",
};