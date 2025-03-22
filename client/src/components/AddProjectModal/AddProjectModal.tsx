import { useProjectForm } from "../../hooks/useProjectForm";
import Modal from "../ui/Modal/Modal";
import CustomInput from "../ui/CustomInput/CustomInput";
import ComponentWraper from "../ui/ComponentWraper/ComponentWraper";

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
    clientsData,
    clientNameData,
    resetState,
  } = useProjectForm();

  const { data, error, loading } = clientsData;

  return (
    <ComponentWraper error={error} loading={loading} spinner={false}>
      <Modal
        areaLabel="projectModal"
        btnTitle="New Project"
        modalTitle="Add Project"
        Icon={FaList}
        btnColor="btn-primary"
        resetHandler={resetState}
      >
        <form onSubmit={hadnleSubmit}>
          <CustomInput data={projectNameData}>
            <CustomInput.Input />
            <CustomInput.Error />
          </CustomInput>

          <CustomInput data={descriptionNameData}>
            <CustomInput.TextArea />
            <CustomInput.Error />
          </CustomInput>

          <CustomInput data={projectStatusNameData}>
            <CustomInput.Select optionsData={optionsData} />
          </CustomInput>

          {data && data.clients && (
            <CustomInput data={clientNameData}>
              <CustomInput.Select optionsData={data.clients} />
            </CustomInput>
          )}
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
    </ComponentWraper>
  );
};

export default AddProjectModal;
