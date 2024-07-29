import { Divider, Input, Slider } from "@nextui-org/react";
import { CropComponent } from "./CropComponent";
import { H1Component } from "./H1Component";
import OPTIONS_LOGO from "../assets/options.svg";
import { IconAndThumbnailButtons } from "./IconAndThumbnailButtons";
import { useRef, useState } from "react";

export function ShowIconAndThumbnailOptionsComponent({ pngUrl }) {
  const [pngName, setPngName] = useState("");
  const [scale, setScale] = useState(1);
  const previewCanvasRef = useRef(null);
  return (
    <>
      <CropComponent
        pngUrl={pngUrl}
        scale={scale}
        previewCanvasRef={previewCanvasRef}
      />
      <Divider />
      <H1Component icon={OPTIONS_LOGO} customIconWidht="3">
        Options
      </H1Component>
      <Slider
        className="max-w-[390px] mx-auto my-10"
        label="Scale"
        step={0.1}
        maxValue={3}
        minValue={0}
        defaultValue={scale}
        color="foreground"
        onChange={(e) => setScale(e)}
      />
      <Input
        type="text"
        label="File name (optional)"
        className="w-1/2 mx-auto my-10"
        onChange={(e) => setPngName(e.target.value)}
      />
      <IconAndThumbnailButtons
        pngName={pngName}
        previewCanvasRef={previewCanvasRef}
      />
    </>
  );
}
