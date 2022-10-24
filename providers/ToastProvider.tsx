import React, { createContext, useCallback, useState } from "react";
import Toast from "../components/Toast";

export type TNotificationType = "success" | "waring" | "error" | "info";
type TToastContext = {
  open: (type: TNotificationType, msg: string) => void;
  close: () => void;
};

export const ToastContext = createContext({
  open: () => {},
  close: () => {},
} as TToastContext);

/**
 * This provider is used to control the display of {@link Toast}.
 * To display Toast correctly, please put this provider to the top of App.
 * 
 * @see {@link Toast}
 * @returns 
 */
export default function ToastProvider(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationType, setNotificationType] =
    useState<TNotificationType>("success");
  const [msg, setMsg] = useState("");

  const openToast = useCallback(
    (type: TNotificationType, msg: string) => {
      setNotificationType(type);
      setMsg(msg);
      setIsOpen(true);
    },
    [setIsOpen]
  );
  const closeToast = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <ToastContext.Provider value={{ open: openToast, close: closeToast }}>
      {isOpen && <Toast notificationType={notificationType} msg={msg}></Toast>}
      {props.children}
    </ToastContext.Provider>
  );
}
