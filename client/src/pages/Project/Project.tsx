import { Link, useParams } from "react-router-dom";
import { Spinner } from "../../components";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../queries/projectQuery";
import { ProjectInterfaceQuery } from "../../components/Projects/Project.model";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import { Client } from "../../components/Clients/Client.model";
import { FC } from "react";

const Project = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery<ProjectInterfaceQuery>(
    GET_PROJECT,
    {
      variables: { id },
    }
  );

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{data?.project.name}</h1>
          <p>{data?.project.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data?.project.status}</p>
          <ClientInfo client={data?.project.client} />
        </div>
      )}
    </>
  );
};

export default Project;

interface ClientInfoInterface {
  client?: Client;
}

const ClientInfo: FC<ClientInfoInterface> = ({ client }) => {
  return (
    <>
      <h5 className="mt-5">Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon" /> {client?.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon" /> {client?.email}
        </li>
        <li className="list-group-item">
          <FaPhone className="icon" /> {client?.phone}
        </li>
      </ul>
    </>
  );
};
