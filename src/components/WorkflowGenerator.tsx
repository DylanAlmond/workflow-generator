import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Queries } from "../constants";
import { useState } from "react";
import { Button } from "./ui/button";
import { useWorkflow } from "./WorkflowProvider";

const WorkflowGenerator = () => {
  const { loading, error, generateWorkflow } = useWorkflow();
  const [query, setQuery] = useState<string>("");

  return (
    <div className="mx-auto flex h-full flex-col gap-8 sm:w-[480px]">
      <div className="flex flex-col items-center justify-center gap-4 sm:h-56">
        <h1 className="text-center text-2xl font-bold sm:text-3xl">
          Workflow Generator
        </h1>

        <p className="text-secondary-foreground text-sm">
          A simple prototype that turns an AI prompt into an interactive
          workflow.
        </p>
      </div>

      <Card className="flex h-full max-h-[600px] w-full flex-col sm:w-[480px]">
        <CardHeader>
          <CardTitle>Create Workflow</CardTitle>
          <p className="font-semibold text-red-500">{error}</p>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4 overflow-y-auto">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="template">Prompt Preset (Optional)</Label>
            <Select
              onValueChange={(e: keyof typeof Queries) => setQuery(Queries[e])}
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
              onInput={(e) => setQuery((e.target as HTMLTextAreaElement).value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            onClick={() => generateWorkflow(query)}
            disabled={loading}
            className="primary"
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkflowGenerator;
