import Spinner from "../ui/Spinner/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/projectQuery";
import { ProjectData } from "./Project.model";
import ProjectCard from "./ProjectCard/ProjectCard";

const Projects = () => {
  const { loading, data, error } = useQuery<ProjectData>(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      {data && data.projects.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Projects;
