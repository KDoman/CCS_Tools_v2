import { Button, Divider, Progress } from "@nextui-org/react";
import { useGetJpgToPngByFile } from "../hooks/useGetJpgToPngByFile";
import { getPngDownloadedImage } from "../helpers/getPngDownloadedImage";
import { H1Component } from "./H1Component";
import { UploadFileDiv } from "./UploadFileDiv";
import { ErrorMessage } from "./ErrorMessage";
import PNG_ICON from "../assets/png.svg";

export function ConvertJpgToPngByFile({
  setIsConvertedByFile,
  isConvertedByURL,
  fileName,
}) {
  const [pngUrl, convertJpgToPng, isLoading, isError] =
    useGetJpgToPngByFile(setIsConvertedByFile);

  return (
    <>
      <div
        className={`${
          isConvertedByURL ? "cursor-not-allowed opacity-50" : ""
        }  `}
      >
        <H1Component icon={PNG_ICON} customIconWidht={2.8}>
          Convert by PNG
        </H1Component>
        <UploadFileDiv
          onChange={convertJpgToPng}
          isDisabled={isConvertedByURL}
        />
        <div className="flex justify-center items-center my-10 w-1/2 mx-auto">
          {isLoading ? (
            <Progress
              color="success"
              aria-label="Loading..."
              isIndeterminate
              className="max-w-full"
              size="md"
            />
          ) : (
            pngUrl && (
              <Button
                isDisabled={isLoading}
                onClick={() => getPngDownloadedImage(pngUrl, fileName)}
              >
                Download Png
              </Button>
            )
          )}
          {isError && <ErrorMessage>Error, invalid file type</ErrorMessage>}
        </div>
        <Divider />
      </div>
    </>
  );
}
