import { FaTrash } from "react-icons/fa";
import { useProjectGraphQlService } from "../../../hooks/useProjectGraphQlService";
import { useProjectCompoundContext } from "../ProjectCompound";
import Modal from "../../ui/Modal/Modal";

const DeleteProjectButton = () => {
  const { data } = useProjectCompoundContext();
  const { useDeleteClient } = useProjectGraphQlService();
  const { deleteProject } = useDeleteClient(data?.project.id ?? "");

  const handleDeleteProject = () => {
    deleteProject();
  };

  return (
    <Modal
      areaLabel="deleteProject"
      btnTitle="Delete Project"
      modalTitle="Delete Project"
      Icon={FaTrash}
      btnColor="btn-danger"
      additionalBtnClass="ms-auto"
    >
      <p className="mb-5">Are your sure you want to delete project?</p>
      <div className="modal-footer mt-2">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-danger "
          onClick={handleDeleteProject}
          data-bs-dismiss="modal"
        >
          Delete Project
        </button>
      </div>
    </Modal>
  );
};

export default DeleteProjectButton;
