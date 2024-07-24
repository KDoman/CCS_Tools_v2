export function H1Component({ children, icon }) {
  return (
    <div className="flex items-center justify-center my-10">
      <img src={icon} className="max-w-[5rem] mr-2" />
      <h1 className="text-3xl text-center">{children}</h1>
    </div>
  );
}
