import { SearchRepo } from "../containers/SearchRepo";
import { ToastProvider } from "../providers";

export default function Home() {
  return (
    <ToastProvider>
      <SearchRepo title="Search repo from GitHub" />
    </ToastProvider>
  );
}
