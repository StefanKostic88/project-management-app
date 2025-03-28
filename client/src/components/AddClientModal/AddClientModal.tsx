import Modal from "../ui/Modal/Modal";
import CustomInput from "../ui/CustomInput/CustomInput";

import { FaUser } from "react-icons/fa";

import { useClientForm } from "../../hooks/useClientForm";
const AddClientModal = () => {
  const { hadnleSubmit, inputData, isDisabled, formValid, reset } = useClientForm();

  return (
    <Modal
      areaLabel="addClientModal"
      btnTitle="Add Client"
      modalTitle="Add Client"
      Icon={FaUser}
      resetHandler={reset}
    >
      <form onSubmit={hadnleSubmit}>
        {inputData.map((data, index) => (
          <CustomInput key={index} data={data}>
            <CustomInput.Input />
            <CustomInput.Error />
          </CustomInput>
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
