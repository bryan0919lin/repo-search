import { CSSProperties } from "react";

export const mainBoxStyle: CSSProperties = {
  display: "flex",
  flexFlow: "column",
  height: "calc(100vh - 16px)",
};

export const searchBarStyle: CSSProperties = {
  flex: "0 1 auto",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexWrap: "wrap",
};

export const repoListStyle: CSSProperties = {
  flex: "1 1 auto",
};

export const footerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  flex: "0 1 20px",
};
