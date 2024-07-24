import { Input } from "@nextui-org/react";
import { DivCardMeasurements } from "./DivCardMeasurements";
import { Button } from "@nextui-org/react";

export function FullMeasurements() {
  return (
    <DivCardMeasurements>
      <Input type="number" label="Full Measurements" />
      <Button>Calculate</Button>
    </DivCardMeasurements>
  );
}
