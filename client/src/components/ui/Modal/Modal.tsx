import { FC, ReactNode } from "react";
import { IconType } from "react-icons";

interface ModalComponent {
  children: ReactNode;
  btnTitle: string;
  modalTitle: string;
  areaLabel: string;
  Icon: IconType;
  btnColor?: "btn-primary" | "btn-secondary" | "btn-danger";
  additionalBtnClass?: string;
  iconClass?: "icon" | "";
}

const Modal: FC<ModalComponent> = ({
  children,
  btnTitle,
  modalTitle,
  areaLabel,
  Icon,
  btnColor = "btn-secondary",
  additionalBtnClass,
  iconClass = "icon",
}) => {
  return (
    <>
      <div className={`d-flex ${additionalBtnClass}`}>
        <button
          type="button"
          className={`btn ${btnColor}`}
          data-bs-toggle="modal"
          data-bs-target={`#${areaLabel}`}
        >
          <div className="d-flex align-items-center">
            <Icon className={`${iconClass}`} />
            <div>{btnTitle}</div>
          </div>
        </button>
      </div>

      <div
        className="modal fade"
        id={areaLabel}
        tabIndex={-1}
        aria-labelledby={`${areaLabel}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${areaLabel}Label`}>
                {modalTitle}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
