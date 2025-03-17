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
        <Modal
          Icon={FaTrash}
          areaLabel={`client-${id}`}
          btnTitle=""
          modalTitle={`Delete ${name}`}
          key={id}
          btnColor="btn-danger"
          iconClass=""
        >
          <Modal.ModalControls
            confirmName="Delete Client"
            title="Are your sure you want to delete client?"
            clickHandler={handleOnDeleteClient}
          />
        </Modal>
      </td>
    </tr>
  );
};

export default ClientRow;
