import { FC } from "react";
import { useCustomInputContext } from "../CustomInput";

const ErrorComponent: FC = () => {
  const { invalidFormat, error } = useCustomInputContext();
  return <>{invalidFormat && <div className="text-danger">{error}</div>}</>;
};

export default ErrorComponent;
