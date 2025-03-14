import { ChangeEvent } from "react";
import Modal from "../ui/Modal/Modal";

import { useClientForm } from "../../hooks/useClientForm";
const AddClientModal = () => {
  const { hadnleSubmit, inputData, isDisabled, formValid } = useClientForm();

  return (
    <Modal
      areaLabel="addClientModal"
      btnTitle="Add Client"
      modalTitle="Add Client"
    >
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
    </Modal>
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
