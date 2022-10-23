import { TIcon } from "../types";

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
