import { FC } from "react";
import { useProjectCompoundContext } from "../ProjectCompound";

const ProjectDetails: FC = () => {
  const { data } = useProjectCompoundContext();
  return (
    <>
      <h1>{data?.project.name}</h1>
      <p>{data?.project.description}</p>
      <h5 className="mt-3">Project Status</h5>
      <p className="lead">{data?.project.status}</p>
    </>
  );
};

export default ProjectDetails;
