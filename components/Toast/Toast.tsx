import { useContext } from "react";
import { TNotificationType, ToastContext } from "../../providers/ToastProvider";
import { toastFooterStyle, toastMsgStyle, toastRootStyle } from "./styles";

type TToastProps = {
  notificationType: TNotificationType;
  msg: string;
};

export const colorMap: Record<TNotificationType, string> = {
  success: "#34c240",
  waring: "#fa9f47",
  error: "#d64242",
  info: "#0090e0",
};

/**
 * Display messages with limited notification type.
 * Each notification type has its own background color to remind user
 * the category of specified message.
 * 
 * To use this component, we need to use {@link ToastProvider} to the root
 * of App.
 * 
 * This is the first version of implementation, and will suppourt displaying
 * multiple messages in the future. 
 * 
 * @see {@link ToastProvider}
 * @returns fixed position toast
 */
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
