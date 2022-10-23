import { CSSProperties } from "react";

export const itemRootStyle: CSSProperties = {
  width: "100%",
  paddingTop: 8,
  paddingBottom: 8,
};

export const itemBlockStyle: CSSProperties = {
  borderRadius: 4,
  backgroundColor: "#ffffff",
  boxShadow:
    "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
};

export const itemContentStyle: CSSProperties = {
  padding: 8,
};

export const itemHeaderStyle: CSSProperties = {
  marginBottom: 8,
};

export const itemDescriptionStyle: CSSProperties = {
  marginBottom: 8,
};

export const itemFooterStyle: CSSProperties = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexWrap: "wrap",
};

export const itemFooterChildStyle: CSSProperties = {
  marginRight: 8,
};
