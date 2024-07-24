import { DivCardMeasurements } from "./DivCardMeasurements";
import { CustomSnippet } from "./CustomSnippet";

export function MeasurementsResult() {
  return (
    <div className="row-start-1 row-end-4 col-start-2 mb-10">
      <div className="sticky top-10 ">
        <DivCardMeasurements>
          <p className="mb-3">Result</p>
          <div className="flex flex-col gap-4">
            <CustomSnippet imgVariant={1} width="full" />
            <CustomSnippet imgVariant={2} width="full" />
            <CustomSnippet imgVariant={3} width="full" />
          </div>
        </DivCardMeasurements>
      </div>
    </div>
  );
}
