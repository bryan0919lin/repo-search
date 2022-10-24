import { TIcon } from "../types";

/**
 * This component is to render a filled circle icon, and implemented by pure css.
 * 
 * @returns a filled circle icon that can change size by css style 
 */
export default function CircleIcon({ style }: TIcon) {
  return (
    <div
      style={{
        ...circleIconStyle,
        ...style,
      }}
    >
      &nbsp;
    </div>
  );
}

const circleIconStyle = {
  width: 16,
  height: 16,
  borderRadius: "50%",
  backgroundColor: "red",
  display: "inline-block",
};
