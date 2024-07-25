export function ErrorMessage({ children }) {
  return (
    <div className="px-8 py-4 border-red-400 border-4 rounded-xl bg-red-100">
      <p>{children}</p>
    </div>
  );
}
