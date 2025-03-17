import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Client } from "../Client.model";
import { useClientGraphQlService } from "../../../hooks/useClientGraphQlService";
import Modal from "../../ui/Modal/Modal";

interface ClientRowProps {
  client: Client;
}

const ClientRow: FC<ClientRowProps> = ({
  client: { email, id, name, phone },
}) => {
  const { useDeleteClient } = useClientGraphQlService();
  const { deleteClient } = useDeleteClient(id);

  const handleOnDeleteClient = () => {
    console.log(id);
    deleteClient();
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        {/* <button
          className="btn bnt-small btn-danger"
          onClick={handleOnDeleteClient}
        >
          <FaTrash />
        </button> */}

        <Modal
          Icon={FaTrash}
          areaLabel={`client-${id}`}
          btnTitle=""
          modalTitle={`Delete ${name}`}
          key={id}
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
              onClick={handleOnDeleteClient}
              data-bs-dismiss="modal"
            >
              Delete Project
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default ClientRow;
