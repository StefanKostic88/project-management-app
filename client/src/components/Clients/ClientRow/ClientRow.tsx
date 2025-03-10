import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Client, ClientData } from "../Client.model";
import { DELETE_CLIENT } from "../../../mutations/clientMutations";
import { GET_CLIENTS } from "../../../queries/clientQuery";
import { useMutation } from "@apollo/client";

interface ClientRowProps {
  client: Client;
}

const ClientRow: FC<ClientRowProps> = ({
  client: { email, name, phone, id },
}) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: id },
    update(cache, { data: { deleteClient } }) {
      const clientData = cache.readQuery<ClientData>({
        query: GET_CLIENTS,
      });

      if (clientData && clientData.clients) {
        const { clients } = clientData;

        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: clients.filter((client) => client.id !== deleteClient.id),
          },
        });
      }
    },
  });

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
