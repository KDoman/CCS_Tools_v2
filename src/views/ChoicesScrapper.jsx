import { H1Component } from "../components/H1Component";
import CHOICES_ICON from "../assets/choices.svg";
import { Button, Divider, Input, Spinner } from "@nextui-org/react";
import { UploadFileDiv } from "../components/UploadFileDiv";
import * as XLSX from "xlsx/xlsx.mjs";
import { useState } from "react";
import { useClearNotation } from "../hooks/useClearNotation";
import { motion, AnimatePresence } from "framer-motion";
import { SuccessMessage } from "../components/SuccessMessage";
import { ErrorMessage } from "../components/ErrorMessage";

export const ChoicesScrapper = () => {
  const [idArray, setIdArray] = useState([]);
  const [login, setlogin] = useState(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState([]);
  const { isError, setIsError, isSuccess, setIsSuccess } = useClearNotation();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        setIdArray(jsonData.map((el) => el.id));
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const downloadXLSX = () => {
    const arrayOfArrays = Object.values(result);
    const keys = Object.keys(result);

    let finalArray = [["ID", "Variable_slug", "Choice_name", "Choice_slug"]];

    for (let i = 0; i < keys.length; i++) {
      const id = keys[i];
      const rows = arrayOfArrays[i];

      rows.forEach((row) => {
        finalArray.push([id, row[0], row[1], row[2]]);
      });
    }
    const ws = XLSX.utils.aoa_to_sheet(finalArray);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const xlsx = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const blob = new Blob([xlsx], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data_file.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const sendData = async () => {
    if (!login || !password) {
      setIsError(true);
      setErrorMessage("The input data must not be empty");
      return;
    }
    try {
      setIsLoading(true);
      const req = await fetch(
        "https://karolkrusz-choices-scrapper.hf.space/test/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: login,
            password,
            product_ids: idArray,
          }),
        }
      );
      if (req.ok) {
        req.json().then((data) => setResult(data));
        setIsSuccess(true);
      } else if (req.status === 420) {
        throw new Error("Login error, check credentials");
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <H1Component icon={CHOICES_ICON}>Choices Scrapper</H1Component>
      <Divider />
      <div className="grid gap-10 m-20 relative">
        <Input
          variant="bordered"
          type="text"
          label="Login"
          onChange={(e) => setlogin(e.target.value.trim())}
          value={login}
        />
        <Input
          variant="bordered"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value.trim())}
          value={password}
        />
        <UploadFileDiv width="w-full" onChange={handleFileChange} />

        <Button onClick={sendData}>Send</Button>
        <Button onClick={downloadXLSX}>Download</Button>

        {isLoading && <Spinner label="Loading" color="default" size="lg" />}
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
      </div>
    </>
  );
};
