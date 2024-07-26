import { Input } from "@nextui-org/react";
import { DivCardMeasurements } from "./DivCardMeasurements";
import { Button } from "@nextui-org/react";
import { getLetterFromFullMeasurements } from "../helpers/getLetterFromFullMeasurements";

export function FullMeasurements({
  fullValue,
  setFullValue,
  setValueX,
  setValueZ,
  setValueY,
}) {
  function onInputChange(e) {
    setFullValue(e.toLowerCase().split("x"));
  }
  function calculateMeasurements() {
    getLetterFromFullMeasurements(fullValue, "w", setValueX);
    getLetterFromFullMeasurements(fullValue, "d", setValueZ);
    getLetterFromFullMeasurements(fullValue, "h", setValueY);
  }

  return (
    <DivCardMeasurements>
      <Input
        type="text"
        label="Full Measurements"
        size="sm"
        onChange={(e) => onInputChange(e.target.value)}
      />
      <Button onClick={calculateMeasurements}>Calculate</Button>
    </DivCardMeasurements>
  );
}
