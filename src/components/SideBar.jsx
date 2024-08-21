import CSS_Logo from "../assets/ccs-tools.png";
import { ListComponentSideBar } from "./ListComponentSideBar";

export function SideBar() {
  return (
    <div className="row-start-1 row-end-5 bg-slate-50 rounded-xl overflow-hidden">
      <div className=" sticky top-[20px]">
        <img
          src={CSS_Logo}
          alt="CSS Tools logo"
          className="max-w-[150px] mx-auto "
        />
        <ListComponentSideBar />
      </div>
    </div>
  );
}
