import { memo, useCallback } from "react";
import { Workflow } from "../types";
import { Converter } from "showdown";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";

interface WorkflowComponentProps {
  workflow: Workflow;
}

const converter = new Converter();

const WorkflowComponent = ({ workflow }: WorkflowComponentProps) => {
  const exportToJSON = useCallback(() => {
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
    <div className="flex w-full flex-col gap-12 md:w-[480px]">
      <h1 className="text-center text-2xl font-bold">{workflow.title}</h1>

      <div className="flex h-full flex-col gap-6 overflow-y-auto">
        {workflow.steps.map((s) => (
          <Card key={s.title} className="m-auto flex w-full flex-col">
            <CardHeader>
              <CardTitle>{s.title}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(s.content),
                }}
              />

              {s.type === "select" ? (
                s.selectMultiple ? (
                  s.values.map((v) => (
                    <div key={v} className="flex items-center space-x-2">
                      <Checkbox />
                      <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {v}
                      </label>
                    </div>
                  ))
                ) : (
                  <RadioGroup>
                    {s.values.map((v) => (
                      <div key={v} className="flex items-center space-x-2">
                        <RadioGroupItem value={v} />
                        <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {v}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                )
              ) : s.type === "textbox" ? (
                <div className="flex flex-col space-y-1.5">
                  <Textarea />
                </div>
              ) : s.type === "image_upload" ? (
                <div className="flex flex-col space-y-1.5">
                  <Label>Upload Image</Label>
                  <Input type="file" />
                </div>
              ) : s.type === "video_upload" ? (
                <div className="flex flex-col space-y-1.5">
                  <Label>Upload Video</Label>
                  <Input type="file" />
                </div>
              ) : null}
            </CardContent>

            <CardFooter className="flex justify-between">
              <p className="text-sm capitalize opacity-50">{s.type}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Button onClick={exportToJSON}>Save Workflow</Button>
    </div>
  );
};

export default memo(WorkflowComponent);
