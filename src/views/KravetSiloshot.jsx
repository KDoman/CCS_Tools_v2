import { H1Component } from "../components/H1Component";
import { Button, Divider, Input, Spinner } from "@nextui-org/react";
import SILO_KRAVET from "../assets/siloKravet.svg";
import { useState } from "react";
import { SuccessMessage } from "../components/SuccessMessage";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorMessage } from "../components/ErrorMessage";
import { useClearNotation } from "../hooks/useClearNotation";
import JSZip from "jszip";

export const KravetSiloshot = () => {
  const [url, setUrl] = useState("");
  const [fabrics, setFabrics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [progressMessage, setProgressMessage] = useState("");

  const { isError, setIsError, isSuccess, setIsSuccess } = useClearNotation();

  async function sendRequest() {
    if (!url || !fabrics) {
      setIsError(true);
      setErrorMessage("The input data must not be empty");
      return;
    }

    try {
      let errors = "";
      setIsLoading(true);
      const zip = new JSZip();
      const listOfFabrics = fabrics.split(",").map((fabric) => fabric.trim());

      for (let i = 0; i < listOfFabrics.length; i++) {
        const formData = new FormData();
        formData.append("product_url", url);
        formData.append("fabric_name", listOfFabrics[i]);
        setProgressMessage(`In progress: ${i + 1} of ${listOfFabrics.length} `);
        const req = await fetch(
          "https://karolkrusz-siloshot-for-kravet.hf.space/generate-images/",
          {
            method: "POST",
            body: formData,
          }
        );
        if (req.ok) {
          const blob = await req.blob();
          zip.file(`kravet_choice_${listOfFabrics[i]}.zip`, blob);
        } else if (req.status === 432) {
          errors += `Error with fabric: ${listOfFabrics[i]}\n`;
        } else if (req.status === 419) {
          throw new Error(`Wrong URL path, url: ${url}`);
        } else {
          throw new Error(`Unexpected error, please contact developers`);
        }
      }

      if (errors) {
        zip.file("Error list.txt", errors);
      }
      const combinedZip = await zip.generateAsync({ type: "blob" });

      const downloadUrl = URL.createObjectURL(combinedZip);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "kravet_siloshot.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
      setIsSuccess(true);
    } catch (e) {
      setIsError(true);
      setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
      setProgressMessage("");
    }
  }

  return (
    <>
      <H1Component icon={SILO_KRAVET} customIconWidht="5">
        Kravet Siloshot
      </H1Component>
      <Divider />
      <form className="grid gap-10 m-20 relative">
        <Input
          variant="bordered"
          type="text"
          label="Model ID"
          onChange={(e) => setUrl(e.target.value.trim())}
          isDisabled={isLoading}
        />
        <Input
          variant="bordered"
          type="text"
          label="Fabrics"
          onChange={(e) => setFabrics(e.target.value)}
          isDisabled={isLoading}
        />
        <Button isDisabled={isLoading} onClick={sendRequest}>
          Send
        </Button>
        {isLoading && (
          <Spinner label={progressMessage} color="default" size="lg" />
        )}

        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: [1, 1.1] }}
            >
              <SuccessMessage>Success</SuccessMessage>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isError && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: [1, 1.1] }}
            >
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </>
  );
};
