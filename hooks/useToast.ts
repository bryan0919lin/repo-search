import { useCallback, useContext } from "react";
import { TNotificationType, ToastContext } from "../providers/ToastProvider";

/**
 * This hook is to open toast with specified notification type and msg.
 * 
 * @returns callback to open Toast
 */
export function useToast() {
  const { open } = useContext(ToastContext);

  return useCallback(
    (type: TNotificationType, msg: string) => {
      open(type, msg);
    },
    [open]
  );
}
