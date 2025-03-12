import { ChangeEvent } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";

import { useClientForm } from "../../hooks/useClientForm";
const AddClientModal = () => {
  const { hadnleSubmit, inputData, isDisabled, formValid } = useClientForm();

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        tabIndex={-1}
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addClientModalLabel">
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
              <form onSubmit={hadnleSubmit}>
                {inputData.map((data, index) => (
                  <CustomInput key={index} {...data} />
                ))}

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
