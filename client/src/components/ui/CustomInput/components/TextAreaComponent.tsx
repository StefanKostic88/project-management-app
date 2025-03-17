import { FC } from "react";
import { CustomInputContextProps, useCustomInputContext } from "../CustomInput";

const TextAreaComponent: FC = () => {
  const { value, label, handleValueChange, handleBlur, invalidFormat } =
    useCustomInputContext() as unknown as CustomInputContextProps<HTMLTextAreaElement>;
  return (
    <textarea
      className={`form-control ${invalidFormat ? "border-danger" : ""}`}
      id={label.toLowerCase()}
      value={value}
      onChange={handleValueChange}
      onBlur={handleBlur}
    />
  );
};

export default TextAreaComponent;
