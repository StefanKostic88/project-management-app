import { ChangeEvent, useState } from "react";

export const useInput = () => {
  const [value, setValue] = useState<string>("");

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value);
  };

  return { value, handleValueChange };
};
