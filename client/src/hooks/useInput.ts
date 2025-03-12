import { ChangeEvent, useMemo, useState } from "react";

interface InputOptions {
  isEmail: boolean;
  errorMsg: string;
}

export const useInput = (options: InputOptions | null = null) => {
  const [value, setValue] = useState<string>("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (options && options.isEmail) {
      const emailPattern = /\S+@\S+\.\S+/;
      const match = emailPattern.test(newValue);
      setError(() => (!match ? options && options.errorMsg : null));
    }

    if (!options) {
      setError(() => (newValue.trim() === "" ? "Invalid format" : null));
    }

    setValue(() => e.target.value);
  };

  const handleBlur = () => {
    if (value.trim() === "")
      setError(() => options?.errorMsg || "Invalid format");
    setTouched(() => true);
  };

  const invalidFormat = useMemo(
    () => (error && touched ? true : false),
    [error, touched]
  );

  const generateSubmitError = () => {
    if (!options && value.trim() === "") {
      setError(() => "Invalid format");
      setTouched(() => true);
      return;
    }
    if (options && options.isEmail && value.trim() === "") {
      setError(() => options && options.errorMsg);
      setTouched(() => true);
      return;
    }
  };

  const reset = () => {
    setValue(() => "");
    setTouched(() => false);
    setError(() => null);
  };

  return {
    error,
    value,
    touched,
    handleValueChange,
    handleBlur,
    invalidFormat,
    generateSubmitError,
    reset,
  };
};
