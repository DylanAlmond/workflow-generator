import { useCallback, useState } from "react";
import { ChatOllama } from "@langchain/ollama";
import { WorkflowSchema, SystemPrompt, Queries } from "./constants";
import { Workflow } from "./types";
import { Button } from "@/components/ui/button";
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

const llm = new ChatOllama({
  model: "granite3.3:8b",
  temperature: 0,
}).withStructuredOutput(WorkflowSchema);

const App = () => {
  const [activeTab, setActiveTab] = useState<string>("create");
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<Workflow | null>(example);

  const GenerateResult = useCallback(async () => {
    setLoading(true);

    const formattedPrompt = await SystemPrompt.formatMessages({
      context: "",
      query,
    });

    const response = (await llm.invoke(formattedPrompt)) as Workflow;

    console.log(response);

    setLoading(false);
    setActiveTab("preview");
    setResult(response);
  }, [query]);

  return (
    <Tabs
      value={activeTab}
      className="bg-background h-dvh w-dvw items-center overflow-hidden p-4"
      onValueChange={(v) => setActiveTab(v)}
    >
      <TabsList className="absolute top-12">
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger disabled={!result} value="preview">
          Preview
        </TabsTrigger>
      </TabsList>

      <TabsContent value="create" className="flex w-full">
        <Card className="m-auto flex h-[480px] md:h-1/2 w-full flex-col md:w-[480px]">
          <CardHeader>
            <CardTitle>Create Workflow</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col gap-4 overflow-y-auto">
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Title of your procedure" />
            </div> */}

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

      <TabsContent value="preview" className="flex h-full pt-28">
        {result ? <WorkflowComponent workflow={result} /> : null}
      </TabsContent>
    </Tabs>
  );
};

export default App;
