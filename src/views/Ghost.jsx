import { H1Component } from "../components/H1Component";
import GHOST_ICON from "../assets/error.svg";

export function Ghost() {
  return (
    <>
      <H1Component icon={GHOST_ICON}>Ghost</H1Component>
    </>
  );
}
