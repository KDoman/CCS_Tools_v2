import { getCurrentDate } from "../helpers/getCurrentDate";
import { useGetCurrentTime } from "../hooks/useGetCurrentTime";

export function TopBar() {
  const date = getCurrentDate();
  const time = useGetCurrentTime();
  return (
    <div className="border-b-1 flex justify-end items-center text-lg bg-slate-50 col-start-2 col-end-6 rounded-xl">
      <p className="mr-3">{date}</p>
      <p className="mr-5">{time}</p>
    </div>
  );
}
