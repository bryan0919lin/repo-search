import React from "react";
import { CSSProperties } from "react";
import { TSearchRepoItem } from "../../../services/api/types";
import { convertISODateStr } from "../../../utils/dateConverter";
import { StarIcon, CircleIcon } from "../../Icons";
import SafeLink from "../../SafeLink";
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

/**
 * Display each GitHub repo info.
 *
 * @return forward ref to set componet ref to parent component
 */
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
              <SafeLink href={item?.htmlUrl} isOpenInNewTab>
                {item?.fullName}
              </SafeLink>
            </div>

            <div style={itemDescriptionStyle}>{item?.description}</div>

            <div style={itemFooterStyle}>
              <div style={itemFooterChildStyle}>
                <StarIcon style={{ marginRight: 2 }} />
                <SafeLink href={item?.stargazersUrl} isOpenInNewTab>
                  {item?.stargazersCount}
                </SafeLink>
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
