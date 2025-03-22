import { ChangeEvent, useMemo, useState } from "react";

interface InputOptions {
  isEmail?: boolean;
  errorMsg?: string;
  initialValue?: string;
}

export const useInput = (options: InputOptions | null = null) => {
  const [value, setValue] = useState<string>(
    options?.initialValue ? options.initialValue : ""
  );
  const [touched, setTouched] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>(null);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;

    if (options && options.isEmail) {
      const emailPattern = /\S+@\S+\.\S+/;
      const match = emailPattern.test(newValue);
      setError(() => (!match ? options && options.errorMsg : null));
    }

    setError(() => (newValue.trim() === "" ? "Invalid format" : null));

    setValue(() => e.target.value);
  };

  const handleTextAreaValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setError(() => (newValue.trim() === "" ? "Invalid format" : null));
    setValue(() => e.target.value);
  };

  const handleBlur = (): void => {
    if (value.trim() === "")
      setError(() => options?.errorMsg || "Invalid format");
    setTouched(() => true);
  };

  const invalidFormat = useMemo(
    () => (error && touched ? true : false),
    [error, touched]
  );

  const generateSubmitError = (): void => {
    if (!options?.initialValue && value.trim() === "") {
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

  const reset = (): void => {
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
    handleTextAreaValueChange,
  };
};
