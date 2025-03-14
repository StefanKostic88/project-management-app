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
  const {
    value: description,
    handleValueChange: handleDescriptionChange,
    error: descriptionError,
    handleBlur: handleDescriptionBlur,
    invalidFormat: descriptionlInvalidFormat,
    generateSubmitError: generateDescriptionError,
    reset: resetDescription,
  } = useInput();
  const {
    value: clientId,
    handleValueChange: handleClientIdChange,
    error: clientIdError,
    handleBlur: handleClientIdBlur,
    invalidFormat: clientIdlInvalidFormat,
    generateSubmitError: generateClientIdError,
    reset: resetClientId,
  } = useInput();

  const inputData = [
    {
      value: name,
      error: nameError,
      handleBlur: handleNameBlur,
      label: "Name",
      handleValueChange: handleNameChange,
      invalidFormat: namelInvalidFormat,
    },
    {
      value: description,
      error: descriptionError,
      handleBlur: handleDescriptionBlur,
      label: "Description",
      handleValueChange: handleDescriptionChange,
      invalidFormat: descriptionlInvalidFormat,
    },
    {
      value: clientId,
      error: clientIdError,
      handleBlur: handleClientIdBlur,
      label: "ClientId",
      handleValueChange: handleClientIdChange,
      invalidFormat: clientIdlInvalidFormat,
    },
  ];

  return { isDisabled, formValid, status, inputData };
};
