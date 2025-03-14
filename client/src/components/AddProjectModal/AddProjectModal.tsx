import { ChangeEvent } from "react";
import { FaList, FaUser } from "react-icons/fa";

import { useClientForm } from "../../hooks/useClientForm";
import { useProject } from "../../hooks/useProjectForm";
const AddClientModal = () => {
  const { inputData, isDisabled, formValid, status } = useProject();

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        <div className="d-flex align-items-center">
          <FaList className="icon" />
          <div>New Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        tabIndex={-1}
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addProjectModalLabel">
                Add Client
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {inputData.map((data, index) => {
                  if (index === 1) {
                    <div className="mb-3">
                      <label
                        className={`form-label ${
                          data.invalidFormat ? "text-danger" : ""
                        }`}
                      >
                        {data.label}
                      </label>
                      <textarea
                        className={`form-control ${
                          data.invalidFormat ? "border-danger" : ""
                        }`}
                        id={data.label.toLowerCase()}
                        value={data.value}
                        onChange={(e) => {}}
                        onBlur={data.handleBlur}
                      />
                      {data.invalidFormat && (
                        <div className="text-danger">{data.error}</div>
                      )}
                    </div>;
                  } else if (index === 2) {
                    return (
                      <div className="mb-3">
                        <label
                          className={`form-label ${
                            data.invalidFormat ? "text-danger" : ""
                          }`}
                        >
                          {data.label}
                        </label>
                        <select
                          id={data.label.toLowerCase()}
                          className="form-select"
                          value={data.value}
                          onChange={(e) => {}}
                        >
                          <option value="new">Not Started</option>
                          <option value="progress">In progress</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    );
                  } else {
                    return <CustomInput {...data} />;
                  }
                })}

                <button
                  className="btn btn-secondary"
                  type="submit"
                  data-bs-dismiss={formValid && "modal"}
                  disabled={isDisabled}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;

const CustomInput = (data: {
  label: string;
  value: string;
  handleValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  error: string | null;
  invalidFormat: boolean;
}) => {
  return (
    <div className="mb-3">
      <label
        className={`form-label ${data.invalidFormat ? "text-danger" : ""}`}
      >
        {data.label}
      </label>
      <input
        type="text"
        className={`form-control ${data.invalidFormat ? "border-danger" : ""}`}
        id={data.label.toLowerCase()}
        value={data.value}
        onChange={data.handleValueChange}
        onBlur={data.handleBlur}
      />
      {data.invalidFormat && <div className="text-danger">{data.error}</div>}
    </div>
  );
};
