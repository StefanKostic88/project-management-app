import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useInput } from "./useInput";
import { InputTypes } from "../components/ui/CustomInput/CustomInput";
import { useClientGraphQlService } from "./useClientGraphQlService";
import { useProjectGraphQlService } from "./useProjectGraphQlService";

export type ProjectStatus = "new" | "progress" | "completed";

interface EditProjectFormOptions {
  projectStatus?: ProjectStatus;
  projectName?: string;
  projectDescription?: string;
}

export const useProjectForm = (
  editProjectFormOptions?: EditProjectFormOptions
) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [status, setStatus] = useState(
    editProjectFormOptions?.projectStatus || "new"
  );
  // const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");

  const { useGetClients } = useClientGraphQlService();
  const { useAddProject } = useProjectGraphQlService();
  const clientsData = useGetClients();
  const clients = clientsData.data?.clients;

  const optionsData = {
    new: "Not Started",
    progress: "In Progress",
    completed: "Completed",
  };

  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>): void => {
    setStatus(() => e.target.value as ProjectStatus);
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
  } = useInput({ initialValue: editProjectFormOptions?.projectName });
  // const {
  //   value: name,
  //   handleValueChange: handleNameChange,
  //   error: nameError,
  //   handleBlur: handleNameBlur,
  //   invalidFormat: namelInvalidFormat,
  //   generateSubmitError: generateNameError,
  //   reset: resetName,
  // } = useInput();

  // initialValue: project?.name,

  const {
    value: description,
    handleTextAreaValueChange: handleDescriptionChange,
    error: descriptionError,
    handleBlur: handleDescriptionBlur,
    invalidFormat: descriptionlInvalidFormat,
    generateSubmitError: generateDescriptionError,
    reset: resetDescription,
  } = useInput({ initialValue: editProjectFormOptions?.projectDescription });
  // const {
  //   value: description,
  //   handleTextAreaValueChange: handleDescriptionChange,
  //   error: descriptionError,
  //   handleBlur: handleDescriptionBlur,
  //   invalidFormat: descriptionlInvalidFormat,
  //   generateSubmitError: generateDescriptionError,
  //   reset: resetDescription,
  // } = useInput();

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
    invalidFormat: descriptionlInvalidFormat,
    error: descriptionError,
    handleBlur: handleDescriptionBlur,
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

  const resetState = () => {
    resetName();
    resetDescription();
    setStatus(() => "new");
    resetClientId();
  };

  const { addProject } = useAddProject({ clientId, description, name, status });

  const hadnleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!formValid) {
      setIsDisabled(() => true);
      generateNameError();
      generateDescriptionError();
      return;
    }

    // addProject({ variables: { name, description, clientId, status } });

    resetState();
  };

  useEffect(() => {
    resetClientId();
  }, [clients]);

  useEffect(() => {
    const isFormValid =
      !!name &&
      !namelInvalidFormat &&
      !!description &&
      !descriptionlInvalidFormat;

    const invalid = namelInvalidFormat || descriptionlInvalidFormat;
    setFormValid(isFormValid);
    setIsDisabled(invalid);
  }, [namelInvalidFormat, name, description, descriptionlInvalidFormat]);

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
    resetState,
  };
};
