import React, { useEffect, useRef } from "react";
import { CSSProperties } from "react";
import { TSearchRepoItem } from "../../../services/api/types";

export type TRepoItemProps = {
  index: number;
  style: CSSProperties;
  data?: TSearchRepoItem[];
  setItemHeight?: (index: number, height: number) => void;
};

const RepoItem = React.forwardRef<HTMLDivElement, TRepoItemProps>(
  (props, ref) => {
    const { index, style, data, setItemHeight } = props;
    const itemRootStyle: CSSProperties = {
      width: "100%",
      paddingTop: 12,
      paddingBottom: 12,
      ...style,
    };

    const itemBlockStyle: CSSProperties = {
      borderRadius: 4,
      backgroundColor: "#ffffff",
      boxShadow:
        "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    };

    const itemContentStyle: CSSProperties = {
      padding: 12,
    };

    const item = data?.[index];

    return (
      <div ref={ref} style={itemRootStyle}>
        <div style={itemBlockStyle}>
          <div style={itemContentStyle}>
            <div>
              <a href={item?.htmlUrl} target="_blank">
                {item?.fullName}
              </a>
            </div>
            <div>{item?.description}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default RepoItem;