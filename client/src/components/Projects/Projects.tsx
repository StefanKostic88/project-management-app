import Spinner from "../ui/Spinner/Spinner";
import ProjectCard from "./ProjectCard/ProjectCard";
import { useProjectGraphQlService } from "../../hooks/useProjectGraphQlService";

const Projects = () => {
  const { useGetProjects } = useProjectGraphQlService();
  const { loading, data, error } = useGetProjects();

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
