import ClientRow from "./ClientRow/ClientRow";

import Spinner from "../ui/Spinner/Spinner";
import { useClientGraphQlService } from "../../hooks/useClientGraphQlService";

const Clients = () => {
  const { useGetClients } = useClientGraphQlService();
  const { data, error, loading } = useGetClients();

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
