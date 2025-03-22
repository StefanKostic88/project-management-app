import { FC } from "react";
import CustomInput from "../../ui/CustomInput/CustomInput";
import { useProjectCompoundContext } from "../ProjectCompound";
import { ProjectStatus, useProjectForm } from "../../../hooks/useProjectForm";

const optionsData = {
  new: "Not Started",
  progress: "In Progress",
  completed: "Completed",
};

const getKeyByValue = (
  obj: Record<string, string>,
  value: string
): string | undefined => {
  return Object.entries(obj).find(([key, val]) => val === value)?.[0];
};

const EditProjectForm: FC = () => {
  const { data } = useProjectCompoundContext();

  const project = data?.project;
  const statusKey = project && getKeyByValue(optionsData, project.status);

  const {
    projectNameData,
    descriptionNameData,
    projectStatusNameData,
    hadnleSubmit,
    isDisabled,
  } = useProjectForm({
    projectName: project?.name,
    projectDescription: project?.description,
    projectStatus: statusKey as ProjectStatus,
  });

  return (
    <div className="mt-5">
      <h3> Update Project Details</h3>
      <form onSubmit={hadnleSubmit}>
        <CustomInput data={projectNameData}>
          <CustomInput.Input />
          <CustomInput.Error />
        </CustomInput>

        <CustomInput data={descriptionNameData}>
          <CustomInput.TextArea />
          <CustomInput.Error />
        </CustomInput>

        <CustomInput data={projectStatusNameData}>
          <CustomInput.Select optionsData={optionsData} />
        </CustomInput>

        <button
          className="btn btn-secondary"
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProjectForm;
