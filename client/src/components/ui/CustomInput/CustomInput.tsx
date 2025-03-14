import { ChangeEvent, createContext, FC, ReactNode, useContext } from "react";
import { Client } from "../../Clients/Client.model";

export type InputTypes =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

interface CustomInputContextProps<T extends InputTypes = HTMLInputElement> {
  label: string;
  value: string;
  error?: string | null;
  invalidFormat?: boolean;
  handleValueChange: (e: ChangeEvent<T>) => void;
  handleBlur?: () => void;
}

interface CustomInputComponent {
  children?: ReactNode;
  data: CustomInputContextProps;
}

type CustomInputType = FC<CustomInputComponent> & {
  Input: FC;
  Error: FC;
  TextArea: FC;
  Select: FC<{
    optionsData: Record<string, string> | Client[];
  }>;
};

const customInputContext = createContext<CustomInputContextProps | null>(null);

function useCustomInputContext() {
  const context = useContext(customInputContext);
  if (!context) {
    throw new Error("Must have a input context");
  }

  return context;
}

const CustomInput: CustomInputType = ({ data, children }) => {
  return (
    <customInputContext.Provider value={data}>
      <div className="mb-3">
        <label
          className={`form-label ${data.invalidFormat ? "text-danger" : ""}`}
        >
          {data.label}
        </label>
        {children}
      </div>
    </customInputContext.Provider>
  );
};

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

const ErrorComponent: FC = () => {
  const { invalidFormat, error } = useCustomInputContext();
  return <>{invalidFormat && <div className="text-danger">{error}</div>}</>;
};

const TextAreaComponent: FC = () => {
  const { value, label, handleValueChange } =
    useCustomInputContext() as unknown as CustomInputContextProps<HTMLTextAreaElement>;
  return (
    <textarea
      className="form-control"
      id={label.toLowerCase()}
      value={value}
      onChange={handleValueChange}
    />
  );
};

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

CustomInput.Input = InputComponent;
CustomInput.Error = ErrorComponent;
CustomInput.TextArea = TextAreaComponent;
CustomInput.Select = SelectOptionsComponent;

export default CustomInput;
