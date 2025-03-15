import { useState } from "react";
import { useInput } from "./useInput";

export const useProject = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [status, setStatus] = useState("new");

  const {
    value: name,
    handleValueChange: handleNameChange,
    error: nameError,
    handleBlur: handleNameBlur,
    invalidFormat: namelInvalidFormat,
    generateSubmitError: generateNameError,
    reset: resetName,
  } = useInput();

  const projectName = {
    value: name,
    error: nameError,
    handleBlur: handleNameBlur,
    label: "Name",
    handleValueChange: handleNameChange,
    invalidFormat: namelInvalidFormat,
  };

  return { projectName };
};
