import { ChangeEvent, CSSProperties } from "react";
import { TSearchRepos } from "../../../services/api/types";
import { filterBarItemStyle } from "./styles";

type TFilterBarProps = {
  text: string;
  handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  data: TSearchRepos[];
  style: CSSProperties;
};

export default function FilterBar({
  text,
  handleTextChange,
  data,
  style,
}: TFilterBarProps) {
  const totalCount = data.slice(-1)[0]?.totalCount ?? 0;
  const loadedCount = data.reduce(
    (accu, searchRepos) => accu + searchRepos.items.length,
    0
  );

  return (
    <div style={style}>
      <div style={filterBarItemStyle}>repo search: </div>
      <div style={filterBarItemStyle}>
        <input type="text" value={text} onChange={handleTextChange} />
      </div>
      {totalCount > 0 && (
        <>
          <div style={filterBarItemStyle}>
            {loadedCount}/{totalCount}
          </div>
          <div style={filterBarItemStyle}>(loaded/total)</div>
        </>
      )}
    </div>
  );
}
