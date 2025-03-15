import { useProject } from "../../hooks/useProjectForm";
import Modal from "../ui/Modal/Modal";
import CustomInput from "../ui/CustomInput/CustomInput";
import { useState } from "react";
import { FaList } from "react-icons/fa";

const AddProjectModal = () => {
  const {
    projectNameData,
    hadnleSubmit,
    isDisabled,
    formValid,
    descriptionNameData,
    projectStatusNameData,
    optionsData,
  } = useProject();

  const [clientId, setClientId] = useState("");

  return (
    <Modal
      areaLabel="projectModal"
      btnTitle="New Project"
      modalTitle="Add Project"
      Icon={FaList}
    >
      <form onSubmit={hadnleSubmit}>
        <CustomInput data={projectNameData}>
          <CustomInput.Input />
          <CustomInput.Error />
        </CustomInput>

        <CustomInput data={descriptionNameData}>
          <CustomInput.TextArea />
        </CustomInput>

        <CustomInput data={projectStatusNameData}>
          <CustomInput.Select optionsData={optionsData} />
        </CustomInput>
        <button
          className="btn btn-secondary"
          type="submit"
          data-bs-dismiss={formValid && "modal"}
          disabled={isDisabled}
        >
          Submit
        </button>
      </form>
    </Modal>
  );
};

export default AddProjectModal;
