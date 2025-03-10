import { useQuery } from "@apollo/client";
import ClientRow from "./ClientRow/ClientRow";
import { ClientData } from "./Client.model";
import { GET_CLIENTS } from "../../queries/clientQuery";
import Spinner from "../ui/Spinner/Spinner";

const Clients = () => {
  const { loading, error, data } = useQuery<ClientData>(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <TableHeader />
          <tbody>
            {data?.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Clients;

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th></th>
      </tr>
    </thead>
  );
};
