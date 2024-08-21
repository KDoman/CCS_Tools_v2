import { H1Component } from "../components/H1Component";
import { Button, Divider, Input, Spinner } from "@nextui-org/react";
import CAMERA from "../assets/camera.svg";
import { useState } from "react";
import { SuccessMessage } from "../components/SuccessMessage";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorMessage } from "../components/ErrorMessage";
import { useClearNotation } from "../hooks/useClearNotation";

export const SiloshotGenerator = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [progressMessage, setProgressMessage] = useState("");

  const { isError, setIsError, isSuccess, setIsSuccess } = useClearNotation();

  async function sendRequest() {
    if (!login || !password || !url || !fileName) {
      setIsError(true);
      setErrorMessage("Check credientals, try again");
      return;
    }
    const formData = new FormData();
    formData.append("username", login);
    formData.append("password", password);
    formData.append("product_url", url);
    formData.append("product_name", fileName);

    try {
      setIsLoading(true);
      setProgressMessage("Loading");
      const req = await fetch(
        "https://karolkrusz-siloshot-generator.hf.space/generate-images/",
        {
          method: "POST",
          body: formData,
        }
      );
      if (req.ok) {
        setProgressMessage("Successful photo production, downloading...");
        const blob = await req.blob();
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `${fileName}_images.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
        setIsSuccess(true);
      } else if (req.status === 420) {
        throw new Error("Login error, check credentials");
      } else if (req.status === 419) {
        throw new Error("Wrong URL path");
      } else {
        throw new Error("Error, please contact with developer");
      }
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
      setProgressMessage("");
    }
  }

  return (
    <>
      <H1Component icon={CAMERA} customIconWidht="4">
        Siloshot generator
      </H1Component>
      <Divider />
      <form className="grid gap-10 m-20 relative">
        <Input
          variant="bordered"
          type="text"
          label="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value.trim())}
          isDisabled={isLoading}
        />
        <Input
          variant="bordered"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          isDisabled={isLoading}
        />
        <Input
          variant="bordered"
          type="text"
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value.trim())}
          isDisabled={isLoading}
        />
        <Input
          variant="bordered"
          type="text"
          label="File name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
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
