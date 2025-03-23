import ProjectCard from "./ProjectCard/ProjectCard";
import { useProjectGraphQlService } from "../../hooks/useProjectGraphQlService";
import ComponentWraper from "../ui/ComponentWraper/ComponentWraper";

const Projects = () => {
  const { useGetProjects } = useProjectGraphQlService();
  const { loading, data, error } = useGetProjects();

  return (
    <ComponentWraper error={error} loading={loading}>
      {data && data.projects.length > 0 ? (
        <div
          className="row mt-4"
          style={{
            maxHeight: "494px",
            overflowY: "auto",
          }}
        >
          {data.projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </ComponentWraper>
  );
};

export default Projects;
