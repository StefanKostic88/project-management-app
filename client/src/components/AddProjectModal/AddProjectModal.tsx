import { useProject } from "../../hooks/useProjectForm";
import Modal from "../ui/Modal/Modal";
import CustomInput from "../ui/CustomInput/CustomInput";

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
  } = useProject();

  const { data, error, loading } = clientsData;

  if (loading) return null;
  if (error) return <div>Something Went Wrong</div>;

  return (
    <>
      {!loading && !error && (
        <Modal
          areaLabel="projectModal"
          btnTitle="New Project"
          modalTitle="Add Project"
          Icon={FaList}
          btnColor="btn-primary"
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
      )}
    </>
  );
};

export default AddProjectModal;
