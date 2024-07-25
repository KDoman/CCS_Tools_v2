import { Input } from "@nextui-org/react";
import { DivCardMeasurements } from "./DivCardMeasurements";
import { Button } from "@nextui-org/react";

export function FullMeasurements() {
  return (
    <DivCardMeasurements>
      <Input type="text" label="Full Measurements" size="sm" />
      <Button>Calculate</Button>
    </DivCardMeasurements>
  );
}
