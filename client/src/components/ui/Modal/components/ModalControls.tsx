import { FC } from "react";
import { ModalControlsProps } from "../Modal";

const ModalControls: FC<ModalControlsProps> = ({
  title,
  confirmName,
  clickHandler,
}) => {
  return (
    <>
      <p className="mb-5">{title}</p>
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
          onClick={clickHandler}
          data-bs-dismiss="modal"
        >
          {confirmName}
        </button>
      </div>
    </>
  );
};

export default ModalControls;
