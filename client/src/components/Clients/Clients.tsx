import ClientRow from "./ClientRow/ClientRow";
import { useClientGraphQlService } from "../../hooks/useClientGraphQlService";
import ComponentWraper from "../ui/ComponentWraper/ComponentWraper";

const Clients = () => {
  const { useGetClients } = useClientGraphQlService();
  const { data, error, loading } = useGetClients();

  return (
    <ComponentWraper error={error} loading={loading}>
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
    </ComponentWraper>
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
