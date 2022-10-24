import React from "react";
import { CSSProperties } from "react";
import { TSearchRepoItem } from "../../../services/api/types";
import { convertISODateStr } from "../../../utils/dateConverter";
import { StarIcon, CircleIcon } from "../../Icons";
import { getLanguageIconColor } from "./helper";
import {
  itemRootStyle,
  itemBlockStyle,
  itemContentStyle,
  itemHeaderStyle,
  itemDescriptionStyle,
  itemFooterStyle,
  itemFooterChildStyle,
} from "./styles";

export type TRepoItemProps = {
  index: number;
  style: CSSProperties;
  data?: TSearchRepoItem[];
  setItemHeight?: (index: number, height: number) => void;
};

const RepoItem = React.forwardRef<HTMLDivElement, TRepoItemProps>(
  (props, ref) => {
    const { index, style, data, setItemHeight } = props;
    const item = data?.[index];

    return (
      <div
        ref={ref}
        style={{
          ...itemRootStyle,
          ...style,
        }}
        role="item"
      >
        <div style={itemBlockStyle}>
          <div style={itemContentStyle}>
            <div style={itemHeaderStyle} data-testid="item-header">
              <a href={item?.htmlUrl} target="_blank">
                {item?.fullName}
              </a>
            </div>

            <div style={itemDescriptionStyle}>{item?.description}</div>

            <div style={itemFooterStyle}>
              <div style={itemFooterChildStyle}>
                <StarIcon style={{ marginRight: 2 }} />
                <a href={item?.stargazersUrl} target="_blank">
                  {item?.stargazersCount}
                </a>
              </div>

              <div style={itemFooterChildStyle}>
                <CircleIcon
                  style={{
                    marginRight: 2,
                    backgroundColor: getLanguageIconColor(item?.language),
                  }}
                />
                {item?.language}
              </div>

              <div style={itemFooterChildStyle}>
                Updated on {convertISODateStr(item?.pushedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default RepoItem;
