import { FaEnvelope, FaIdBadge, FaPhone } from "react-icons/fa";
import { useProjectCompoundContext } from "../ProjectCompound";
import { FC } from "react";

const ClientInfo: FC = () => {
  const { data } = useProjectCompoundContext();

  return (
    <>
      <h5 className="mt-5">Client Information</h5>
      <ul className="list-group">
        <li className="list-group-item">
          <FaIdBadge className="icon" /> {data?.project.client.name}
        </li>
        <li className="list-group-item">
          <FaEnvelope className="icon" /> {data?.project.client.email}
        </li>
        <li className="list-group-item">
          <FaPhone className="icon" /> {data?.project.client.phone}
        </li>
      </ul>
    </>
  );
};

export default ClientInfo;
