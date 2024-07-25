import { useState } from "react";
import { ConvertJpgToPngByFile } from "./ConvertJpgToPngByFile";
import { ConvertJpgToPngByUrl } from "./ConvertJpgToPngByUrl";

export function JpegToPngConverter() {
  const [isConvertedByFile, setIsConvertedByFile] = useState(false);
  const [isConvertedByURL, setIsConvertedByURL] = useState(false);

  return (
    <>
      <ConvertJpgToPngByFile
        isConvertedByURL={isConvertedByURL}
        setIsConvertedByFile={setIsConvertedByFile}
      />
      <ConvertJpgToPngByUrl
        isConvertedByFile={isConvertedByFile}
        setIsConvertedByURL={setIsConvertedByURL}
      />
    </>
  );
}
