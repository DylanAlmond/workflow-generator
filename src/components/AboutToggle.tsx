import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Converter } from "showdown";

const converter = new Converter();

const AboutToggle = () => {
  const [markdownHtml, setMarkdownHtml] = useState("");

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/DylanAlmond/workflow-generator/main/README.md",
        );
        const markdown = await response.text();
        const html = converter.makeHtml(markdown);
        setMarkdownHtml(html);
      } catch (error) {
        setMarkdownHtml("<p>Failed to load README.</p>");
        console.error("Error fetching README:", error);
      }
    };

    fetchReadme();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Info className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">About</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>About</DialogTitle>
        </DialogHeader>

        <div
          className="markdown flex flex-1 flex-col gap-4 overflow-y-auto text-sm"
          dangerouslySetInnerHTML={{ __html: markdownHtml }}
        />

        <DialogFooter>
          <p className="text-muted-foreground text-sm">
            @{new Date().getFullYear()} Dylan Almond
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AboutToggle;
