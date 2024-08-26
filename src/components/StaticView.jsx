import { CenteredContainer } from "./CenteredContainer";
import { TopBar } from "./TopBar";
import { SideBar } from "./SideBar";
import AnimatedOutlet from "./AnimatedOutlet";

export function StaticView() {
  return (
    <CenteredContainer>
      <div className="grid grid-cols-[300px_1fr] grid-rows-[80px_1fr] gap-8 bg-[var(--main-theme-color)] ">
        <TopBar />
        <SideBar />
        <div className="col-span-4 row-span-3 col-start-2 row-start-2 bg-slate-50 rounded-xl overflow-hidden">
          <AnimatedOutlet />
        </div>
      </div>
    </CenteredContainer>
  );
}
