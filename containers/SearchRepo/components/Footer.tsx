import Image from "next/image";

export default function Footer({ isLoading, hasNext, data, style }) {
  return (
    <div style={style}>
      {isLoading && <Image src="/loading_spinner.svg" width={32} height={32} />}
      {!isLoading &&
        hasNext &&
        "Please scroll down to the bottom of list to fetch more data."}
      {data?.length && !hasNext && "End of result."}
    </div>
  );
}
