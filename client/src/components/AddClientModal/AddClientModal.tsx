import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { useInput } from "../../hooks/useInput";
const AddClientModal = () => {
  const { value: name, handleValueChange: handleNameChange } = useInput();

  const {
    value: email,
    handleValueChange: handleEmailChange,
    error: emailError,
    handleBlur: handleEmailBlur,
    invalidFormat: emailInvalidFormat,
  } = useInput({ isEmail: true, errorMsg: "Email must be in a valid format" });

  const { value: phone, handleValueChange: handlePhoneChange } = useInput();

  const [isDisabled, setIsDisabled] = useState(false);

  const hadnleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, phone);
  };

  useEffect(() => {
    setIsDisabled(() => (emailInvalidFormat ? true : false));
  }, [emailInvalidFormat]);

  console.log(emailInvalidFormat);
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
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <div className="mb-3">
                  <label
                    className={`form-label ${
                      emailInvalidFormat ? "text-danger" : ""
                    }`}
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      emailInvalidFormat ? "border-danger" : ""
                    }`}
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                  />
                  {emailInvalidFormat && (
                    <div className="text-danger">{emailError}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>

                <button
                  className="btn btn-secondary"
                  type="submit"
                  data-bs-dismiss="modal"
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
