import { H1Component } from "../components/H1Component";
import ICON_AND_THUMB_ICON from "../assets/icon.svg";
import { UploadFileDiv } from "../components/UploadFileDiv";
import { ChangeFileNameComponent } from "../components/ChangeFileNameComponent";
import { Divider, Slider } from "@nextui-org/react";
import { IconAndThumbnailButtons } from "../components/IconAndThumbnailButtons";
import { CropComponent } from "../components/CropComponent";
export function IconAndThumbnail() {
  return (
    <div className="relative">
      <H1Component icon={ICON_AND_THUMB_ICON}>Icon & Thumbnail</H1Component>
      <UploadFileDiv />
      <ChangeFileNameComponent />
      <Slider
        className="max-w-[390px] mx-auto mb-10"
        label="Scale"
        step={0.1}
        maxValue={3}
        minValue={0}
        defaultValue={1}
        color="foreground"
      />
      <Divider />
      <CropComponent />
      <Divider />
      <IconAndThumbnailButtons />
    </div>
  );
}
