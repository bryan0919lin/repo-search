import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ToastProvider } from "../../../providers";
import Toast, { colorMap } from "../Toast";

const convertHexToRGBA = (hexCode: string) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

const expectToast = (props: Parameters<typeof Toast>[0]) => {
    const msgElement = screen.getByText(props.msg);
    expect(msgElement).toBeInTheDocument();
    expect(msgElement).toHaveStyle({
      backgroundColor: convertHexToRGBA(
        colorMap[props.notificationType]
      ),
    });
};

const defaultProps: Parameters<typeof Toast>[0] = {
  notificationType: "success",
  msg: "bryan test",
};

const setup = (props = defaultProps) =>
  render(
    <ToastProvider>
      <Toast {...props} />
    </ToastProvider>
  );

describe("Toast", () => {
  it("should render success toast with specified msg", () => {
    setup();
    expectToast(defaultProps);
  });

  it("should render warning toast with specified msg", () => {
    const props: Parameters<typeof Toast>[0] = {
      ...defaultProps,
      notificationType: "waring",
    };
    setup(props);
    expectToast(props);
  });

  it("should render error toast with specified msg", () => {
    const props: Parameters<typeof Toast>[0] = {
      ...defaultProps,
      notificationType: "error",
    };
    setup(props);
    expectToast(props);
  });

  it("should render info toast with specified msg", () => {
    const props: Parameters<typeof Toast>[0] = {
      ...defaultProps,
      notificationType: "info",
    };
    setup(props);
    expectToast(props);
  });
});
