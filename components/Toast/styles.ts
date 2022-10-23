import { CSSProperties } from "react";

export const toastRootStyle: CSSProperties = {
  position: "absolute",
  right: 8,
  bottom: 8,
  zIndex: 1000,
  width: 260,
  height: 180,
  color: "#ffffff",
  padding: 8,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export const toastMsgStyle = {
  flex: "0 1 auto",
};

export const toastFooterStyle = {
  flex: "0 1 auto",
  display: "flex",
  justifyContent: "flex-end",
};
