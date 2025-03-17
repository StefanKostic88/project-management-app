import { FaTrash } from "react-icons/fa";
import { useProjectGraphQlService } from "../../../hooks/useProjectGraphQlService";
import { useProjectCompoundContext } from "../ProjectCompound";

const DeleteProjectButton = () => {
  const { data } = useProjectCompoundContext();
  const { useDeleteClient } = useProjectGraphQlService();
  const { deleteProject } = useDeleteClient(data?.project.id ?? "");

  const handleDeleteProject = () => {
    deleteProject();
  };

  return (
    <>
      <div className="d-flex mt-5 ms-auto">
        <button
          className="btn btn-danger m-2"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <FaTrash className="icon" /> Delete Project
        </button>
      </div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Delete Project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are your sure you want to delete project?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteProject}
                data-bs-dismiss="modal"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteProjectButton;
