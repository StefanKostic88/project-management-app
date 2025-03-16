import { useMutation, useQuery } from "@apollo/client";
import { ProjectData } from "../components/Projects/Project.model";
import { GET_PROJECTS } from "../queries/projectQuery";
import { ADD_PROJECT } from "../mutations/projectMutations";

export const useProjectGraphQlService = () => {
  const useAddProject = (options: {
    name: string;
    description: string;
    clientId: string;
    status: string;
  }) => {
    const { name, description, clientId, status } = options;
    const [addProject] = useMutation(ADD_PROJECT, {
      variables: { name, description, clientId, status },
      update(cache, { data: { addProject } }) {
        const projectData = cache.readQuery<ProjectData>({
          query: GET_PROJECTS,
        });

        if (projectData && projectData.projects) {
          const { projects } = projectData;

          cache.writeQuery({
            query: GET_PROJECTS,
            data: {
              projects: projects.concat([addProject]),
            },
          });
        }
      },
    });

    return { addProject };
  };

  const useGetProjects = () => {
    const { loading, data, error } = useQuery<ProjectData>(GET_PROJECTS);
    return { loading, data, error };
  };

  return { useGetProjects, useAddProject };
};
