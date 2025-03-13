import Spinner from "../ui/Spinner/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/projectQuery";
import { ProjectData } from "../Clients/Client.model";

const Projects = () => {
  const { loading, data, error } = useQuery<ProjectData>(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  const noProjects = <p>No Projects</p>;

  return (
    <>
      {data && data.projects.length > 0 ? (
        <div className="row"></div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Projects;
