import { useMutation, useQuery } from "@apollo/client";
import { ClientData } from "../components/Clients/Client.model";
import { GET_CLIENTS } from "../queries/clientQuery";
import { ADD_CLIENT, DELETE_CLIENT } from "../mutations/clientMutations";

export const useClientGraphQlService = () => {
  const useAddClient = (options: {
    name: string;
    email: string;
    phone: string;
  }) => {
    const { name, email, phone } = options;
    const [addClient] = useMutation(ADD_CLIENT, {
      variables: { name, email, phone },
      update(cache, { data: { addClient } }) {
        const clientData = cache.readQuery<ClientData>({
          query: GET_CLIENTS,
        });

        if (clientData && clientData.clients) {
          const { clients } = clientData;

          cache.writeQuery({
            query: GET_CLIENTS,
            data: {
              clients: clients.concat([addClient]),
            },
          });
        }
      },
    });

    return { addClient };
  };

  const useDeleteClient = (id: string) => {
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
              clients: clients.filter(
                (client) => client.id !== deleteClient.id
              ),
            },
          });
        }
      },
    });

    return { deleteClient };
  };

  const useGetClients = () => {
    const { loading, error, data } = useQuery<ClientData>(GET_CLIENTS);
    return { loading, error, data };
  };

  return { useAddClient, useGetClients, useDeleteClient };
};
