import { FC } from "react";
import { CustomInputContextProps, useCustomInputContext } from "../CustomInput";
import { Client } from "../../../Clients/Client.model";

const isRecord = <K extends string, V>(data: unknown): data is Record<K, V> => {
  return !Array.isArray(data) && typeof data === "object" && data !== null;
};

const SelectOptionsComponent: FC<{
  optionsData: Record<string, string> | Client[];
}> = ({ optionsData }) => {
  const { value, handleValueChange, label } =
    useCustomInputContext() as unknown as CustomInputContextProps<HTMLSelectElement>;
  return (
    <select
      value={value}
      onChange={handleValueChange}
      id={label.toLowerCase()}
      className="form-select"
    >
      {isRecord(optionsData)
        ? Object.entries(optionsData).map(([key, value]) => {
            return (
              <option value={key} key={key}>
                {value}
              </option>
            );
          })
        : optionsData.map(({ id, name }) => {
            return (
              <option value={id} key={id}>
                {name}
              </option>
            );
          })}
    </select>
  );
};

export default SelectOptionsComponent;
