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
import { example } from "./example";
import { ThemeProvider } from "./components/ThemeProvider";
import { ModeToggle } from "./components/ModeToggle";

const llm = new ChatOllama({
  model: "granite3.3:8b",
  temperature: 0,
}).withStructuredOutput(WorkflowSchema);

const App = () => {
  const [activeTab, setActiveTab] = useState<string>("create");
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Workflow | null>(example);

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

      setActiveTab("preview");
      setResult(response);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        console.log("An unknown error occurred");
      }
    }

    setLoading(false);
  }, [query]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="absolute top-8 right-8">
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
                <Label htmlFor="template">Prompt Template (Optional)</Label>
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
