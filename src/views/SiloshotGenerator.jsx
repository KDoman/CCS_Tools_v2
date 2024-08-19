import { H1Component } from "../components/H1Component";
import { Button, Divider, Input } from "@nextui-org/react";
import CAMERA from "../assets/camera.svg";
import { useState } from "react";
import { SuccessMessage } from "../components/SuccessMessage";
import { AnimatePresence, motion } from "framer-motion";
import { ErrorMessage } from "../components/ErrorMessage";

export const SiloshotGenerator = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function sendRequest() {
    if (!login || !password || !url) {
      setErrorMessage("Check credientals, try again");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }

    const formData = new FormData();
    formData.append("username", "howardmiller@intiaro.com");
    formData.append("password", "MilleR2022!");
    formData.append(
      "product_url",
      "https://portal.intiaro.com/reviewer-product-details/16795"
    );
    formData.append("product_name", "testKacper");
    const req = await fetch(
      "https://karolkrusz-siloshot-generator.hf.space/generate-imagesss/",
      {
        method: "POST",
        body: formData,
      }
    );
    if (req.ok) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } else {
      setIsError(true);
      setErrorMessage("Error 404");
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }

  return (
    <>
      <H1Component icon={CAMERA} customIconWidht="4">
        Siloshot generator
      </H1Component>
      <Divider />
      <form className="grid gap-10 m-20 relative">
        <Input type="text" label="Login" />
        <Input type="password" label="Password" />
        <Input type="text" label="URL" />
        <Input type="text" label="File name" />
        <Button onClick={sendRequest}>Send</Button>
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: [1, 1.1] }}
            >
              <SuccessMessage>Ok</SuccessMessage>
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
