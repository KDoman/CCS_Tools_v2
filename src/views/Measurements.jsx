import { FullMeasurements } from "../components/FullMeasurements";
import { H1Component } from "../components/H1Component";
import { ManualMeasurements } from "../components/ManualMeasurements";
import { MeasurementsResult } from "../components/MeasurementsResult";
import { MeasurementsDefaults } from "../components/MeasurementsDefaults";
import CALC_ICON from "../assets/calc.svg";
import { Divider } from "@nextui-org/react";

export function Measurements() {
  return (
    <div className="mb-10 relative">
      <H1Component icon={CALC_ICON}>Measurements</H1Component>
      <div className="grid grid-cols-[repeat(2,minmax(200px,1fr))] grid-rows-2 gap-y-10">
        <FullMeasurements />
        <MeasurementsResult />
        <ManualMeasurements />
      </div>
      <Divider className="mb-10" />
      <MeasurementsDefaults />
    </div>
  );
}
