import { useEffect, useState } from "react";

export function useClearNotation() {
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }
    if (isError) {
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }, [isError, isSuccess]);

  return { isError, setIsError, isSuccess, setIsSuccess };
}
