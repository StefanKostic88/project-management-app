import {
  ChangeEvent,
  createContext,
  FC,
  FormEvent,
  ReactNode,
  useContext,
  useState,
} from "react";
import ComponentWraper from "../ui/ComponentWraper/ComponentWraper";
import { Link } from "react-router-dom";

import { ProjectInterfaceQuery } from "../Projects/Project.model";
import { ApolloError } from "@apollo/client";

import ClientInfo from "./components/ClientInfo";
import ProjectDetails from "./components/ProjectDetails";
import DeleteProjectButton from "./components/DeleteProjectButton";
import CustomInput from "../ui/CustomInput/CustomInput";
import { useProject } from "../../hooks/useProjectForm";
import { useInput } from "../../hooks/useInput";
import { InputTypes } from "../ui/CustomInput/CustomInput";

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
          {props.data && <EditProjectForm project={props.data.project} />}
        </div>
      </ComponentWraper>
    </projectCompoundContext.Provider>
  );
};

ProjectCompound.ClientInfo = ClientInfo;
ProjectCompound.DeleteProjectButton = DeleteProjectButton;
ProjectCompound.ProjectDetails = ProjectDetails;

export default ProjectCompound;

const optionsData = {
  new: "Not Started",
  progress: "In Progress",
  completed: "Completed",
};

const EditProjectForm: FC<ProjectInterfaceQuery> = ({ project }) => {
  const getKeyByValue = (
    obj: Record<string, string>,
    value: string
  ): string | undefined => {
    return Object.entries(obj).find(([key, val]) => val === value)?.[0];
  };

  const xx = getKeyByValue(optionsData, project.status);
  const [status, setStatus] = useState(xx ? xx : "new");
  const handleSelectStatus = (e: ChangeEvent<HTMLSelectElement>): void => {
    setStatus(() => e.target.value);
  };

  const {
    handleBlur: nameHandleBlur,
    error: nameError,
    handleValueChange: nameHandleValueChange,
    value: nameValue,
    invalidFormat: nameInvalidFormat,
  } = useInput({
    initialValue: project.name,
  });
  const { handleBlur, error, handleValueChange, value, invalidFormat } =
    useInput({
      initialValue: project.description,
    });

  const projectStatusNameData = {
    value: status,
    handleValueChange: handleSelectStatus as (
      e: ChangeEvent<InputTypes>
    ) => void,
    label: "Status",
  };

  const projectNameDataUpdated = {
    value: nameValue,
    error: nameError,
    handleBlur: nameHandleBlur,
    label: "Name",
    handleValueChange: nameHandleValueChange,
    invalidFormat: nameInvalidFormat,
  };
  const descriptionNameDataUpdated = {
    value: value,
    error: error,
    handleBlur: handleBlur,
    label: "Name",
    handleValueChange: handleValueChange,
    invalidFormat: invalidFormat,
  };

  return (
    <div className="mt-5">
      <h3> Update Project Details</h3>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          console.log(nameValue, descriptionNameDataUpdated.value, status);
        }}
      >
        <CustomInput data={projectNameDataUpdated}>
          <CustomInput.Input />
          <CustomInput.Error />
        </CustomInput>

        <CustomInput data={descriptionNameDataUpdated}>
          <CustomInput.TextArea />
          <CustomInput.Error />
        </CustomInput>

        <CustomInput data={projectStatusNameData}>
          <CustomInput.Select optionsData={optionsData} />
        </CustomInput>

        <button
          className="btn btn-secondary"
          type="submit"
          // data-bs-dismiss={formValid && "modal"}
          // disabled={isDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
