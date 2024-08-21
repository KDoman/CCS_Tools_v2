export function ShadowDiv({ children, className }) {
  return (
    <div
      className={`rounded-lg shadow-[0_0_5px_var(--main-theme-color)] ${className}`}
    >
      {children}
    </div>
  );
}
