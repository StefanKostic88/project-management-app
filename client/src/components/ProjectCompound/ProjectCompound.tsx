import { createContext, FC, ReactNode, useContext } from "react";
import ComponentWraper from "../ui/ComponentWraper/ComponentWraper";
import { Link } from "react-router-dom";

import { ProjectInterfaceQuery } from "../Projects/Project.model";
import { ApolloError } from "@apollo/client";

import ClientInfo from "./components/ClientInfo";
import ProjectDetails from "./components/ProjectDetails";
import DeleteProjectButton from "./components/DeleteProjectButton";

import EditProjectForm from "./components/EditProjectForm";

interface ProjectCompoundContext {
  data?: ProjectInterfaceQuery;
  error?: ApolloError;
  loading: boolean;
}

interface ProjectCompoundProps {
  props: ProjectCompoundContext;
  children: ReactNode;
}

type CustomProjectCompound = FC<ProjectCompoundProps> & {
  ProjectDetails: FC;
  ClientInfo: FC;
  DeleteProjectButton: FC;
  EditProjectForm: FC;
};

const projectCompoundContext = createContext<null | ProjectCompoundContext>(
  null
);

export function useProjectCompoundContext() {
  const context = useContext(projectCompoundContext);
  if (!context) {
    throw new Error("Must have a project compound context");
  }

  return context;
}

const ProjectCompound: CustomProjectCompound = ({ children, props }) => {
  return (
    <projectCompoundContext.Provider value={props}>
      <ComponentWraper loading={props.loading} error={props.error}>
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>
          {children}
        </div>
      </ComponentWraper>
    </projectCompoundContext.Provider>
  );
};

ProjectCompound.ClientInfo = ClientInfo;
ProjectCompound.DeleteProjectButton = DeleteProjectButton;
ProjectCompound.ProjectDetails = ProjectDetails;
ProjectCompound.EditProjectForm = EditProjectForm;

export default ProjectCompound;
