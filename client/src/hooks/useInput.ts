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
    if (options && options.isEmail) {
      const emailPattern = /\S+@\S+\.\S+/;
      const match = emailPattern.test(e.target.value);

      setError(() => (!match ? options && options.errorMsg : null));
    }

    setValue(() => e.target.value);
  };

  const handleBlur = () => {
    if (value === "") setError(() => options?.errorMsg || "Invalid format");
    setTouched(() => true);
  };

  const invalidFormat = useMemo(() => error && touched, [error, touched]);

  return {
    error,
    value,
    touched,
    handleValueChange,
    handleBlur,
    invalidFormat,
  };
};
