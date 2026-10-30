import { Outlet } from "react-router";

/** Pathless shell so `/match` (index) and `/match/:levelId` can coexist. */
export function MatchLayout() {
  return <Outlet />;
}

export default MatchLayout;
