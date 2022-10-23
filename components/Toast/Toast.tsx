import { useContext } from "react";
import { TNotificationType, ToastContext } from "../../providers/ToastProvider";
import { toastFooterStyle, toastMsgStyle, toastRootStyle } from "./styles";

type TToastProps = {
  notificationType: TNotificationType;
  msg: string;
};

const colorMap: Record<TNotificationType, string> = {
  success: "#34c240",
  waring: "#fa9f47",
  error: "#d64242",
  info: "#0090e0",
};

export default function Toast({ notificationType, msg }: TToastProps) {
  const { close } = useContext(ToastContext);

  return (
    <div
      style={{
        ...toastRootStyle,
        backgroundColor: colorMap[notificationType],
      }}
    >
      <div style={toastMsgStyle}>{msg}</div>
      <div style={toastFooterStyle}>
        <button onClick={close}>close</button>
      </div>
    </div>
  );
}
