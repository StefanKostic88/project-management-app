import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useInput } from "./useInput";
import { InputTypes } from "../components/ui/CustomInput/CustomInput";
import { useClientGraphQlService } from "./useClientGraphQlService";

export const useProject = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");

  const { useGetClients } = useClientGraphQlService();
  const clientsData = useGetClients();
  const clients = clientsData.data?.clients;

  const optionsData = {
    new: "Not Started",
    progress: "In Progress",
    completed: "Completed",
  };

  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>): void => {
    setStatus(() => e.target.value);
  };

  const handleDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDescription(() => e.target.value);
  };

  const handleSelectClientId = (e: ChangeEvent<HTMLSelectElement>): void => {
    setClientId(() => e.target.value);
  };

  const {
    value: name,
    handleValueChange: handleNameChange,
    error: nameError,
    handleBlur: handleNameBlur,
    invalidFormat: namelInvalidFormat,
    generateSubmitError: generateNameError,
    reset: resetName,
  } = useInput();

  const projectNameData = {
    value: name,
    error: nameError,
    handleBlur: handleNameBlur,
    label: "Name",
    handleValueChange: handleNameChange,
    invalidFormat: namelInvalidFormat,
  };

  const descriptionNameData = {
    value: description,
    handleValueChange: handleDescriptionChange as (
      e: ChangeEvent<InputTypes>
    ) => void,
    label: "Description",
  };

  const clientNameData = {
    value: clientId,
    label: "Client",
    handleValueChange: handleSelectClientId as (
      e: ChangeEvent<InputTypes>
    ) => void,
  };

  const projectStatusNameData = {
    value: status,
    handleValueChange: handleSelectStatus as (
      e: ChangeEvent<InputTypes>
    ) => void,
    label: "Status",
  };

  const resetClientId = () => {
    if (clients?.length && clientId !== clients[0].id) {
      setClientId(clients[0].id);
    }
  };

  const hadnleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!formValid) {
      setIsDisabled(() => true);
      generateNameError();
      return;
    }

    resetName();
    setDescription(() => "");
    setStatus(() => "new");
    resetClientId();
  };

  useEffect(() => {
    resetClientId();
  }, [clients]);

  useEffect(() => {
    const isFormValid = !!name && !namelInvalidFormat;
    setFormValid(isFormValid);
    setIsDisabled(namelInvalidFormat);
  }, [namelInvalidFormat, name]);

  return {
    projectNameData,
    resetName,
    hadnleSubmit,
    isDisabled,
    formValid,
    descriptionNameData,
    optionsData,
    projectStatusNameData,
    clientsData,
    clientNameData,
  };
};
