import { useMutation, useQuery } from "@apollo/client";
import {
  ProjectData,
  ProjectInterfaceQuery,
} from "../components/Projects/Project.model";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQuery";
import { ADD_PROJECT, DELETE_PROJECT } from "../mutations/projectMutations";
import { useNavigate } from "react-router-dom";

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

  const useDeleteClient = (projectId: string) => {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
      variables: { id: projectId },
      onCompleted: () => navigate("/"),
    });

    return { deleteProject };
  };

  const useGetProject = (id: string) => {
    const { data, loading, error } = useQuery<ProjectInterfaceQuery>(
      GET_PROJECT,
      {
        variables: { id },
      }
    );

    return { data, loading, error };
  };

  return { useGetProjects, useAddProject, useDeleteClient, useGetProject };
};
