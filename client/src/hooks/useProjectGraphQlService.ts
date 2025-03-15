import { useQuery } from "@apollo/client";
import { ProjectData } from "../components/Projects/Project.model";
import { GET_PROJECTS } from "../queries/projectQuery";

export const useProjectGraphQlService = () => {
  const useGetProjects = () => {
    const { loading, data, error } = useQuery<ProjectData>(GET_PROJECTS);
    return { loading, data, error };
  };

  return { useGetProjects };
};
