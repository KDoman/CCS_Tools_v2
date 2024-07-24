import FILE_ICON from "../assets/file.svg";

export function UploadFileDiv() {
  return (
    <>
      <input type="file" id="file_input" className="hidden" ref={null} />
      <div className="w-1/2 mx-auto">
        <label htmlFor="file_input">
          <div className=" text-xl flex flex-col items-center justify-center  border-dashed border-5 rounded-3xl cursor-pointer p-10 w-full">
            <img
              src={FILE_ICON}
              className="max-h-[5rem] bg-[var(--border-and-shadow-color)] rounded-full p-4"
            />
            <p className="font-bold mt-3">Upload file</p>
          </div>
        </label>
      </div>
    </>
  );
}
