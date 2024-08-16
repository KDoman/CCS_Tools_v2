import SUCCESS_LOGO from "../assets/success.svg";

export function SuccessMessage({ children }) {
  return (
    <div className="px-8 py-4 border-green-400 border-4 rounded-xl bg-green-100 flex items-center ">
      <img src={SUCCESS_LOGO} alt="" className="max-w-8 mr-5" />
      <p>{children}</p>
    </div>
  );
}
