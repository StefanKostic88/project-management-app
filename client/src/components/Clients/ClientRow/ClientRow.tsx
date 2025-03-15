import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Client } from "../Client.model";
import { useClientGraphQlService } from "../../../hooks/useClientGraphQlService";

interface ClientRowProps {
  client: Client;
}

const ClientRow: FC<ClientRowProps> = ({
  client: { email, name, phone, id },
}) => {
  const { useDeleteClient } = useClientGraphQlService();
  const { deleteClient } = useDeleteClient(id);

  const handleOnDelete = () => {
    deleteClient();
  };

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className="btn bnt-small btn-danger" onClick={handleOnDelete}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
