import { Button } from "@nextui-org/react";

export function IconAndThumbnailButtons() {
  return (
    <div className="flex justify-evenly items-center flex-col  h-[200px]">
      <Button>Set Image</Button>
      <div>
        <Button className="mr-10">Download 128x128</Button>
        <Button>Download 512x512</Button>
      </div>
    </div>
  );
}
