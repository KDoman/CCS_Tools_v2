export function CenteredContainer({ children }) {
  return (
    <div className="mx-8 py-8">
      <div className="max-w-[1600px] rounded-2xl relative mx-auto">
        {children}
      </div>
    </div>
  );
}
