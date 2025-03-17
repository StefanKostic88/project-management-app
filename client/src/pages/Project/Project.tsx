import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useProjectGraphQlService } from "../../hooks/useProjectGraphQlService";
import { ProjectCompound } from "../../components";

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
    <ProjectCompound props={{ data, error, loading }}>
      <ProjectCompound.ProjectDetails />
      <ProjectCompound.ClientInfo />
      <ProjectCompound.DeleteProjectButton />
    </ProjectCompound>
  );
};

export default Project;
