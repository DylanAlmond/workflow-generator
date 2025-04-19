import { useCallback, useState } from "react";
import { ChatOllama } from "@langchain/ollama";
import { WorkflowSchema, SystemPrompt, Queries } from "./constants";
import { Workflow } from "./types";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import WorkflowComponent from "./components/WorkflowComponent";
import { ThemeProvider } from "./components/ThemeProvider";
import { ModeToggle } from "./components/ModeToggle";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import Ajv from "ajv";

const llm = new ChatOllama({
  model: "granite3.3:8b",
  temperature: 0,
}).withStructuredOutput(WorkflowSchema);

const ajv = new Ajv();
const validate = ajv.compile(WorkflowSchema);

const App = () => {
  const [activeTab, setActiveTab] = useState<string>("create");
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Workflow | null>(null);

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

          setResult(json as Workflow);
          setActiveTab("preview");
        } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("An unknown error occurred");
          }

          setActiveTab("create");
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }, []);

  const exportToJSON = useCallback(() => {
    if (!result) return;

    const json = JSON.stringify(result, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const link = document.createElement("a");
    const href = URL.createObjectURL(blob);

    link.href = href;
    link.download = result.title;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }, [result]);

  const GenerateResult = useCallback(async () => {
    setLoading(true);
    setError(null);

    const formattedPrompt = await SystemPrompt.formatMessages({
      context: "",
      query,
    });

    try {
      const response = (await llm.invoke(formattedPrompt)) as Workflow;
      console.log(response);

      setResult(response);
      setActiveTab("preview");
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred");
      }

      setActiveTab("create");
    }

    setLoading(false);
  }, [query]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="absolute top-8 right-8 flex gap-3">
        <div className="hidden gap-3 sm:flex">
          <Button variant="outline" onClick={importJSON}>
            Import
          </Button>
          <Button disabled={!result} onClick={exportToJSON}>
            Export
          </Button>
        </div>

        <div className="block sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <ChevronDown className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
                <span className="sr-only">Options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={importJSON}>Import</DropdownMenuItem>
              <DropdownMenuItem disabled={!result} onClick={exportToJSON}>
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ModeToggle />
      </div>

      <Tabs
        value={activeTab}
        className="bg-background h-dvh w-dvw items-center gap-8 overflow-hidden py-8"
        onValueChange={(v) => setActiveTab(v)}
      >
        <TabsList>
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger disabled={!result} value="preview">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="create"
          className="flex h-full w-full overflow-hidden px-8"
        >
          <Card className="m-auto flex h-full max-h-[600px] w-full flex-col md:w-[480px]">
            <CardHeader>
              <CardTitle>Create Workflow</CardTitle>
              <p className="font-semibold text-red-500">{error}</p>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-4 overflow-y-auto">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="template">Prompt Preset (Optional)</Label>
                <Select
                  onValueChange={(e: keyof typeof Queries) =>
                    setQuery(Queries[e])
                  }
                >
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {Object.keys(Queries).map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-1 flex-col space-y-1.5">
                <Label htmlFor="prompt">Prompt</Label>
                <Textarea
                  id="prompt"
                  placeholder="Prompt for your procedure"
                  className="mb-2 flex-1 resize-none"
                  value={query}
                  onInput={(e) =>
                    setQuery((e.target as HTMLTextAreaElement).value)
                  }
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                onClick={GenerateResult}
                disabled={loading}
                className="primary"
              >
                {loading ? "Generating..." : "Generate"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent
          value="preview"
          className="flex h-full w-full overflow-hidden px-8"
        >
          {result ? <WorkflowComponent workflow={result} /> : null}
        </TabsContent>
      </Tabs>
    </ThemeProvider>
  );
};

export default App;
