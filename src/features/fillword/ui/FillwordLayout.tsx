import { Outlet } from "react-router";

/** Shell so `/fillword` (hub) and `/fillword/:topicId` (play) can coexist. */
export function FillwordLayout() {
  return <Outlet />;
}

export default FillwordLayout;
