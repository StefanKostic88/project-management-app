import { ChangeEvent, createContext, FC, ReactNode, useContext } from "react";
import { Client } from "../../Clients/Client.model";
import InputComponent from "./components/InputComponent";
import ErrorComponent from "./components/ErrorComponent";
import TextAreaComponent from "./components/TextAreaComponent";
import SelectOptionsComponent from "./components/SelectOptionsComponent";

export type InputTypes =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export interface CustomInputContextProps<
  T extends InputTypes = HTMLInputElement
> {
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

export function useCustomInputContext() {
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

CustomInput.Input = InputComponent;
CustomInput.Error = ErrorComponent;
CustomInput.TextArea = TextAreaComponent;
CustomInput.Select = SelectOptionsComponent;

export default CustomInput;
