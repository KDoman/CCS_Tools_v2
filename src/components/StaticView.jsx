import { CenteredContainer } from "./CenteredContainer";
import { TopBar } from "./TopBar";
import { SideBar } from "./SideBar";
import { Outlet } from "react-router-dom";

export function StaticView() {
  return (
    <CenteredContainer>
      <div className="grid grid-cols-[300px_1fr] grid-rows-[80px_1fr] gap-8 bg-[#d8d6d6] ">
        <TopBar />
        <SideBar />
        <div className="col-span-4 row-span-3 col-start-2 row-start-2 bg-slate-50 rounded-xl">
          <Outlet />
        </div>
      </div>
    </CenteredContainer>
  );
}
