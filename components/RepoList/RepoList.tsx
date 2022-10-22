import React, { CSSProperties, UIEvent, useCallback, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { TSearchRepos } from "../../services/api/types";

type TRepoListProps = CSSProperties & {
  items: TSearchRepos["items"];
  itemHeight: number;
  onScroll?: (e: UIEvent<HTMLElement>) => void;
  style: CSSProperties;
  children: ({ index, style, data, ref }) => JSX.Element;
};

export default function RepoList({
  items,
  itemHeight,
  onScroll,
  style,
  children,
}: TRepoListProps) {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [offsetHeight, setOffsetHeight] = useState(0);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  const [_, setCount] = useState(0);
  const forceUpdate = () => {
    setCount((prev) => prev + 1);
  };

  const getItemTop = (idx: number) => {
    let itemTop = 0;
    for (let i = 0; i < idx; i++) {
      itemTop +=
        itemRefs.current?.[i]?.getBoundingClientRect()?.height || itemHeight;
    }
    return itemTop;
  };

  const getTotalItemsHeight = () => {
    let currentTotalItemHeight = 0;
    items.forEach((_, idx) => {
      currentTotalItemHeight +=
        itemRefs.current?.[idx]?.getBoundingClientRect()?.height ?? itemHeight;
    });
    return currentTotalItemHeight;
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
    setOffsetHeight(e.currentTarget.offsetHeight);
    onScroll?.(e);
  };

  useEffect(() => {
    // initialize inner container offset height by auto-calculating
    const mainContainer = mainContainerRef.current;
    if (mainContainer && offsetHeight === 0) {
      setOffsetHeight(mainContainer.clientHeight);
    }
    
    forceUpdate()
  }, [items, scrollTop, offsetHeight]);

  return (
    <div
      ref={mainContainerRef}
      style={{
        ...style,
        ...containerStyle,
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          ...innerContainerStyle,
          height: getTotalItemsHeight(),
        }}
      >
        {Array.from(items).map((repoItem, index) => {
          const realItemHeight =
            itemRefs.current?.[index]?.getBoundingClientRect()?.height;
          const finalItemHeight = realItemHeight ?? itemHeight;

          const style: CSSProperties = {
            position: "absolute",
            top: getItemTop(index),
          };

          const isItemVisible =
            // itemRefs.current.length === items.length &&
            (style.top as number) + finalItemHeight >= scrollTop &&
            (style.top as number) < scrollTop + offsetHeight;

          // only render visible items
          return (
            isItemVisible &&
            children({
              index,
              style,
              data: items,
              ref: (el: HTMLDivElement) => (itemRefs.current[index] = el),
            })
          );
        })}
      </div>
    </div>
  );
}

function isNumber(
  itemHeight: TRepoListProps["itemHeight"]
): itemHeight is number {
  return !(typeof itemHeight === "function");
}

const containerStyle: CSSProperties = {
  overflowX: "hidden",
  overflowY: "auto",
};

const innerContainerStyle: CSSProperties = {
  position: "relative",
};
