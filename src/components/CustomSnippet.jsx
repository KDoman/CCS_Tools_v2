import { Snippet } from "@nextui-org/react";
import { getCorrectSVG } from "../helpers/getCorrectSVG";

export function CustomSnippet({ children, width = "10rem", imgVariant }) {
  const svgSrc = getCorrectSVG(imgVariant);
  return (
    <Snippet
      symbol={<img src={svgSrc} className="max-w-[1.4rem]" />}
      className={`w-[${width}]`}
    >
      {children}
    </Snippet>
  );
}
