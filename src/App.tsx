import { useState } from "react";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { ModeToggle } from "./components/ModeToggle";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { useWorkflow } from "./components/WorkflowProvider";
import WorkflowPreview from "./components/WorkflowPreview";
import WorkflowGenerator from "./components/WorkflowGenerator";
import AboutToggle from "./components/AboutToggle";

const App = () => {
  const { workflow, importJSON, exportJSON } = useWorkflow();
  const [activeTab, setActiveTab] = useState<string>("create");

  return (
    <>
      <div className="absolute top-8 left-8 flex gap-2">
        <AboutToggle />
      </div>

      <div className="absolute top-8 right-8 flex gap-2">
        <div className="hidden gap-2 sm:flex">
          <Button variant="outline" onClick={importJSON}>
            Import
          </Button>
          <Button disabled={!workflow} onClick={exportJSON}>
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
              <DropdownMenuItem disabled={!workflow} onClick={exportJSON}>
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
          <TabsTrigger disabled={!workflow} value="preview">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="create"
          className="flex h-full w-full overflow-hidden px-8"
        >
          <WorkflowGenerator />
        </TabsContent>

        <TabsContent
          value="preview"
          className="flex h-full w-full overflow-hidden px-8"
        >
          <WorkflowPreview />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default App;
