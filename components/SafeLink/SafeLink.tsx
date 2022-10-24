type TSafeLinkProps = {
  href: string;
  isOpenInNewTab: boolean;
  children: React.ReactNode;
};

export default function SafeLink({
  href,
  isOpenInNewTab,
  children,
}: TSafeLinkProps) {
  const openInNewTabProps = !isOpenInNewTab
    ? {}
    : {
        target: "_blank",
        rel: "noreferrer noopener",
      };

  const linkProps = {
    href,
    ...openInNewTabProps,
  };

  return <a {...linkProps}>{children}</a>;
}
