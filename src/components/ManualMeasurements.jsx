import { Button, Input, Switch } from "@nextui-org/react";
import { DivCardMeasurements } from "./DivCardMeasurements";
import { useState } from "react";

export function ManualMeasurements() {
  const [isManualMeasurementsOn, setIsManualMeasurementsOn] = useState(false);
  return (
    <DivCardMeasurements>
      <Switch
        size="sm"
        color="success"
        onChange={() => setIsManualMeasurementsOn((prev) => !prev)}
      >
        Manual measurements
      </Switch>
      <Input
        type="number"
        label="X"
        size="sm"
        isDisabled={!isManualMeasurementsOn}
      />
      <Input
        type="number"
        label="Y"
        size="sm"
        isDisabled={!isManualMeasurementsOn}
      />
      <Input
        type="number"
        label="Z"
        size="sm"
        isDisabled={!isManualMeasurementsOn}
      />
      <Button isDisabled={!isManualMeasurementsOn}>Calculate</Button>
    </DivCardMeasurements>
  );
}
