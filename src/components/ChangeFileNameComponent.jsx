import TRASHCAN from "../assets/trashcan.svg";

export function ChangeFileNameComponent() {
  return (
    <div className="flex mx-auto justify-between items-center bg-zinc-200 rounded-full pl-3 w-[400px] my-10">
      <input
        type="text"
        className=" bg-transparent outline-none w-[80%]"
        placeholder="File name"
      />
      <button>
        <img src={TRASHCAN} className="max-h-[3rem]" />
      </button>
    </div>
  );
}
