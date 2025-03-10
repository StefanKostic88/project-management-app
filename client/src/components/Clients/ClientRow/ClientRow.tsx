import { FC } from "react";
import { FaTrash } from "react-icons/fa";
import { Client } from "../Client.model";
import { DELETE_CLIENT } from "../../../mutations/clientMutations";
import { useMutation } from "@apollo/client";

interface ClientRowProps {
  client: Omit<Client, "id">;
}

const ClientRow: FC<ClientRowProps> = ({ client: { email, name, phone } }) => {
  const x = useMutation(DELETE_CLIENT);

  const handleOnDelete = () => {};

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className="btn bnt-small btn-danger">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
