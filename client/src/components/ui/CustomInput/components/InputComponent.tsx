import { FC } from "react";
import { useCustomInputContext } from "../CustomInput";

const InputComponent: FC = () => {
  const { value, label, handleValueChange, handleBlur, invalidFormat } =
    useCustomInputContext();
  return (
    <input
      type="text"
      className={`form-control ${invalidFormat ? "border-danger" : ""}`}
      id={label.toLowerCase()}
      value={value}
      onChange={handleValueChange}
      onBlur={handleBlur}
    />
  );
};

export default InputComponent;
