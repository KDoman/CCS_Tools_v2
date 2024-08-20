import { useState } from "react";
import { H1Component } from "../components/H1Component";
import TRANSFORM_IMPORTER_ICON from "../assets/transform_importer.svg";
import { Button } from "@nextui-org/button";
import { UploadFileDiv } from "../components/UploadFileDiv";
import { Input } from "@nextui-org/input";
import { ErrorMessage } from "../components/ErrorMessage";
import { SuccessMessage } from "../components/SuccessMessage";
import { motion, AnimatePresence } from "framer-motion";
import { Divider, Spinner } from "@nextui-org/react";
import { useClearNotation } from "../hooks/useClearNotation";

export const TransformImporter = () => {
  const [transforms, setTransforms] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const { isError, setIsError, isSuccess, setIsSuccess } = useClearNotation();

  const handleFileUpload = (event) => {
    setIsButtonDisabled(false);

    const selectedFile = event.target.files[0];

    if (!selectedFile || !selectedFile.size) {
      setIsError("Empty file");
      setIsButtonDisabled(true);
      return;
    }

    if (selectedFile && selectedFile.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = (e) => {
        setTransforms(e.target.result);
        setFile(selectedFile);
      };
      reader.readAsText(selectedFile);
    } else {
      setIsButtonDisabled(true);
      setIsError("Invalid file type.");
    }
  };

  const handleSubmit = async () => {
    if (!file || !username || !password) {
      setIsError("Check login credentials");
      return;
    }

    try {
      setIsFileUploading(true);
      const formData = new FormData();
      formData.append("file", file); // Dodaj plik do FormData

      // Dodanie dodatkowych danych
      formData.append("username", username);
      formData.append("password", password);
      formData.append("transforms", transforms);

      const response = await fetch(
        "https://karolkrusz-transforms-importer.hf.space/run-playwright/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        setIsSuccess(true);
        setUsername("");
        setPassword("");
      } else if (response.status === 420) {
        throw new Error("Login error, try again");
      } else if (response.status === 503) {
        throw new Error("Server error, please contact with developer");
      }
    } catch (err) {
      setIsError(err.message);
    } finally {
      setIsFileUploading(false);
    }
  };

  return (
    <>
      <H1Component icon={TRANSFORM_IMPORTER_ICON}>
        Transform Importer
      </H1Component>
      <Divider />
      <div className="grid gap-10 m-20 relative">
        <Input
          type="text"
          value={username}
          label="Login"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <UploadFileDiv onChange={handleFileUpload} width="w-full" />

        <Button
          isDisabled={isButtonDisabled || isFileUploading}
          onClick={handleSubmit}
        >
          Wyślij
        </Button>

        {isFileUploading && (
          <Spinner color="default" size="lg" label="Loading..." />
        )}
        <AnimatePresence>
          {isError && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: [1, 1.1] }}
            >
              <ErrorMessage>{isError}</ErrorMessage>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: [1, 1.1] }}
            >
              <SuccessMessage>
                Transformy zostały dodane pomyślnie
              </SuccessMessage>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
