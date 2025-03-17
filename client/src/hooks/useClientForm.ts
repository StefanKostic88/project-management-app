import { FormEvent, useEffect, useState } from "react";
import { useInput } from "./useInput";
import { useClientGraphQlService } from "./useClientGraphQlService";

export const useClientForm = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const { useAddClient } = useClientGraphQlService();

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
    value: email,
    handleValueChange: handleEmailChange,
    error: emailError,
    handleBlur: handleEmailBlur,
    invalidFormat: emailInvalidFormat,
    generateSubmitError: generateEmailError,
    reset: resetEmail,
  } = useInput({ isEmail: true, errorMsg: "Email must be in a valid format" });

  const {
    value: phone,
    handleValueChange: handlePhoneChange,
    error: phoneError,
    handleBlur: handlepPhoneBlur,
    invalidFormat: phoneInvalidFormat,
    generateSubmitError: generatePhoneError,
    reset: resetPhone,
  } = useInput();

  const { addClient } = useAddClient({ name, email, phone });

  const generateInputErrors = () => {
    generateNameError();
    generateEmailError();
    generatePhoneError();
  };

  const reset = () => {
    resetName();
    resetEmail();
    resetPhone();
  };

  const hadnleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formValid) {
      setIsDisabled(() => true);
      generateInputErrors();
      return;
    }

    addClient({ variables: { name, email, phone } });

    reset();
  };

  useEffect(() => {
    const isFormValid =
      !!name &&
      !!email &&
      !!phone &&
      !namelInvalidFormat &&
      !emailInvalidFormat &&
      !phoneInvalidFormat;

    const invalid =
      namelInvalidFormat || emailInvalidFormat || phoneInvalidFormat;

    setFormValid(isFormValid);
    setIsDisabled(invalid);
  }, [
    namelInvalidFormat,
    emailInvalidFormat,
    phoneInvalidFormat,
    email,
    name,
    phone,
  ]);

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
      value: email,
      error: emailError,
      handleBlur: handleEmailBlur,
      label: "Email",
      handleValueChange: handleEmailChange,
      invalidFormat: emailInvalidFormat,
    },
    {
      value: phone,
      error: phoneError,
      handleBlur: handlepPhoneBlur,
      label: "Phone",
      handleValueChange: handlePhoneChange,
      invalidFormat: phoneInvalidFormat,
    },
  ];

  return {
    inputData,
    isDisabled,
    hadnleSubmit,
    formValid,
    reset,
  };
};
