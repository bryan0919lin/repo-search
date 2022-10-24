import { TIcon } from "../types";

/**
 * This component is to render a filled star icon, and implemented by pure css.
 * 
 * @returns a filled star icon that can change size by css style.
 */
export default function StarIcon({ style }: TIcon) {
  return (
    <div
      style={{
        ...starIconStyle,
        ...style,
      }}
    >
      &nbsp;
    </div>
  );
}

const starIconStyle = {
  background: "#efcc00",
  clipPath:
    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
  display: "inline-block",
  height: 16,
  width: 16,
};
