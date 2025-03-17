import { Link, useParams } from "react-router-dom";

import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import { Client } from "../../components/Clients/Client.model";
import { FC, useEffect } from "react";
import { FaTrash } from "react-icons/fa";

import { useProjectGraphQlService } from "../../hooks/useProjectGraphQlService";
import { ComponentWraper } from "../../components";

const Project = () => {
  const { id } = useParams();
  const { useGetProject } = useProjectGraphQlService();
  const { data, loading, error } = useGetProject(id ?? "");

  useEffect(() => {
    if (data && data.project.name) {
      const title = data.project.name;
      document.title = title;
    }
  }, [data]);

  return (
    <ComponentWraper loading={loading} error={error}>
      <div className="mx-auto w-75 card p-5">
        <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
          Back
        </Link>
        <h1>{data?.project.name}</h1>
        <p>{data?.project.description}</p>
        <h5 className="mt-3">Project Status</h5>
        <p className="lead">{data?.project.status}</p>
        <ClientInfo client={data?.project.client} />
        <DeleteProjectButton projectId={id ? id : ""} />
      </div>
    </ComponentWraper>
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

interface DeleteProjectButtonProps {
  projectId: string;
}

const DeleteProjectButton: FC<DeleteProjectButtonProps> = ({ projectId }) => {
  const { useDeleteClient } = useProjectGraphQlService();
  const { deleteProject } = useDeleteClient(projectId);

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={() => deleteProject()}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
};
