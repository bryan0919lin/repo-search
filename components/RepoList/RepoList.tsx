import React, { CSSProperties, UIEvent, useCallback, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForceUpdate } from "../../hooks/";
import { TSearchRepos } from "../../services/api/types";
import { containerStyle, innerContainerStyle } from "./styles";

type TRepoListProps = CSSProperties & {
  items: TSearchRepos["items"];
  itemHeight: number;
  onScroll?: (e: UIEvent<HTMLElement>) => void;
  style: CSSProperties;
  children: ({ index, style, data, ref }) => JSX.Element;
};

/**
 * Display each GitHub repo info in this component.
 * To prevent UI performance issue, I use a simple virtulized 
 * implemntation so that we can deal with large amount of data.
 * 
 * The basic concept is to only render visible items. For example,
 * if we have 1,000,000 to display in this list, we just render the visble items
 * by calculating the height of each items, and scroll offset to find out which
 * items should be visble and should be rendered.
 *
 * @returns a list that can accept large amount of data
 */
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
  const forceUpdate = useForceUpdate();

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

    // For the first render, we set each item height as the same value 
    // from props, then we can get real item height by ref. Therefore,
    // we need to force render to get correct display.
    forceUpdate();
  }, [items, scrollTop, offsetHeight]);

  return (
    <div
      data-testid="repo-list"
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
