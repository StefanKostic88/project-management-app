import { useProject } from "../../hooks/useProjectForm";
import Modal from "../ui/Modal/Modal";
import CustomInput from "../ui/CustomInput/CustomInput";
import { ChangeEvent, useState } from "react";
import { FaList } from "react-icons/fa";
import { InputTypes } from "../ui/CustomInput/CustomInput";

const AddProjectModal = () => {
  const { projectName } = useProject();
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(() => e.target.value);
  };

  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(() => e.target.value);
  };

  const optionsData = {
    new: "Not Started",
    progress: "In Progress",
    completed: "Completed",
  };

  return (
    <Modal
      areaLabel="projectModal"
      btnTitle="New Project"
      modalTitle="Add Project"
      Icon={FaList}
    >
      <form onSubmit={() => {}}>
        <CustomInput data={projectName}>
          <CustomInput.Input />
          <CustomInput.Error />
        </CustomInput>

        <CustomInput
          data={{
            value: description,
            handleValueChange: handleDescriptionChange as (
              e: ChangeEvent<InputTypes>
            ) => void,
            label: "Description",
          }}
        >
          <CustomInput.TextArea />
        </CustomInput>

        <CustomInput
          data={{
            value: status,
            handleValueChange: handleSelectStatus as (
              e: ChangeEvent<InputTypes>
            ) => void,
            label: "Status",
          }}
        >
          <CustomInput.Select optionsData={optionsData} />
        </CustomInput>
        <button
          className="btn btn-secondary"
          type="submit"
          // data-bs-dismiss={formValid && "modal"}
          // disabled={isDisabled}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default AddProjectModal;
