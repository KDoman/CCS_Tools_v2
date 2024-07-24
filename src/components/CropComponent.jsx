import { ShadowDiv } from "./ShadowDiv";

export function CropComponent() {
  return (
    <div className="flex justify-center align-center ">
      <ShadowDiv className={"m-10 w-[400px] h-auto"}>Crop</ShadowDiv>
      <ShadowDiv className={"m-10 w-[400px] h-auto"}>Crop Result</ShadowDiv>
    </div>
  );
}
