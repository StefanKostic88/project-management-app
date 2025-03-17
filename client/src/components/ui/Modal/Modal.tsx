import { FC, ReactNode, useEffect, useRef } from "react";
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
  resetHandler?: () => void;
}

export interface ModalControlsProps {
  title: string;
  confirmName: string;
  clickHandler: () => void;
}

type CustomModalComponent = FC<ModalComponent> & {
  ModalControls: FC<ModalControlsProps>;
};

const Modal: CustomModalComponent = ({
  children,
  btnTitle,
  modalTitle,
  areaLabel,
  Icon,
  btnColor = "btn-secondary",
  additionalBtnClass,
  iconClass = "icon",
  resetHandler,
}) => {
  const openButtonRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!modalRef.current) return;
    const modalElement = modalRef.current;
    const handleHiden = () => {
      openButtonRef.current?.focus();
    };
    modalElement.addEventListener("hidden.bs.modal", handleHiden);

    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleHiden);
    };
  }, []);

  return (
    <>
      <div className={`d-flex ${additionalBtnClass}`}>
        <button
          ref={openButtonRef}
          type="button"
          className={`btn ${btnColor}`}
          data-bs-toggle="modal"
          data-bs-target={`#${areaLabel}`}
          onClick={resetHandler}
        >
          <div className="d-flex align-items-center">
            <Icon className={`${iconClass}`} />
            <div>{btnTitle}</div>
          </div>
        </button>
      </div>

      <div
        ref={modalRef}
        className="modal fade"
        id={areaLabel}
        tabIndex={-1}
        aria-labelledby={`${areaLabel}Label`}
        aria-hidden="true"
        data-bs-backdrop="static"
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

Modal.ModalControls = ModalControls;

export default Modal;
