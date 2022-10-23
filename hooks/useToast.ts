import { useCallback, useContext } from "react";
import { TNotificationType, ToastContext } from "../providers/ToastProvider";

export function useToast() {
  const { open } = useContext(ToastContext);

  return useCallback(
    (type: TNotificationType, msg: string) => {
      open(type, msg);
    },
    [open]
  );
}
