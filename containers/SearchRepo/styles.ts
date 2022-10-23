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
  flex: "0 1 32px",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
};
