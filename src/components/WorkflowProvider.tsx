import Ajv from "ajv";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Workflow } from "../types";
import { SystemPrompt, WorkflowSchema } from "../constants";
import { ChatOllama } from "@langchain/ollama";

interface WorkflowProviderProps {
  children: ReactNode;
}

interface WorkflowContextProps {
  workflow: Workflow | null;
  loading: boolean;
  error: string | null;
  setWorkflow: React.Dispatch<React.SetStateAction<Workflow | null>>;
  generateWorkflow: (query: string) => void;
  importJSON: () => void;
  exportJSON: () => void;
}

const llm = new ChatOllama({
  model: "granite3.3:8b",
  temperature: 0,
}).withStructuredOutput(WorkflowSchema);

const ajv = new Ajv();
const validate = ajv.compile(WorkflowSchema);

const WorkflowContext = createContext<WorkflowContextProps | undefined>(
  undefined,
);

const WorkflowProvider = ({ children }: WorkflowProviderProps) => {
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateWorkflow = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    const formattedPrompt = await SystemPrompt.formatMessages({
      context: "",
      query,
    });

    try {
      const response = (await llm.invoke(formattedPrompt)) as Workflow;
      console.log(response);

      setWorkflow(response);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }
    }

    setLoading(false);
  }, []);

  const importJSON = useCallback(() => {
    setError(null);

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          const valid = validate(json);

          if (!valid)
            throw new Error("The provided JSON is not a valid Workflow");

          setWorkflow(json as Workflow);
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }, []);

  const exportJSON = useCallback(() => {
    if (!workflow) return;

    const json = JSON.stringify(workflow, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    const href = URL.createObjectURL(blob);

    link.href = href;
    link.download = workflow.title;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [workflow]);

  return (
    <WorkflowContext.Provider
      value={{
        workflow,
        loading,
        error,
        setWorkflow,
        generateWorkflow,
        importJSON,
        exportJSON,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);

  if (context === undefined)
    throw new Error("useWorkflow must be used within a WorkflowProvider");

  return context;
};

export default WorkflowProvider;
