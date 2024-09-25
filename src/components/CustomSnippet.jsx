import { Snippet } from "@nextui-org/react";
import { getCorrectSVG } from "../helpers/getCorrectSVG";

export function CustomSnippet({
  children,
  width,
  imgVariant,
  additionalClasses,
}) {
  const svgSrc = getCorrectSVG(imgVariant);
  return (
    <Snippet
      symbol={
        <img
          src={svgSrc}
          className={`max-w-[1.3rem] inline-block mr-2 ${additionalClasses}`}
        />
      }
      className={`${width}`}
    >
      {children}
    </Snippet>
  );
}
