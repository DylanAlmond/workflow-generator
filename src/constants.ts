import { ChatPromptTemplate } from "@langchain/core/prompts";

export const SystemPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    `You are a smart assistant that generates step-by-step workflows to guide users through tasks or procedures.

Your output should include:

A clear and relevant title

An ordered array of steps

Each step must have a specific purpose and use one of the following types:

"info": to explain or instruct

"select": to confirm that the user has checked, chosen, or verified something

"textbox": to collect relevant input or a measurement from the user

"image_upload" or "video_upload": only if visual confirmation is needed (e.g., inspection photos)

Only request input (textbox, select, upload) when it is necessary for safety, accuracy, or decision-making. 

Do not ask for personal information like usernames, passwords, or product keys under any circumstances.

Ensure that a "select" input always has at least 2 values to select.

Focus on clarity, logic, and practicality. The steps should form a complete, easy-to-follow guide.`,
  ],
  ["human", "Context:\n{context}\n\nQuery: {query}"],
]);

export const WorkflowSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Workflow",
  description:
    "Schema for defining a workflow consisting of various step types.",
  type: "object",
  required: ["title", "steps"],
  properties: {
    title: {
      type: "string",
      description: "The title of the workflow.",
    },
    steps: {
      type: "array",
      description: "A list of steps that make up the workflow.",
      items: {
        oneOf: [
          {
            type: "object",
            required: ["type", "title", "content"],
            properties: {
              type: {
                const: "info",
                description:
                  "Defines this step as an informational text block.",
              },
              title: { type: "string", description: "The title of the step." },
              content: {
                type: "string",
                description: "The body content of the step.",
              },
            },
          },
          {
            type: "object",
            required: ["type", "title", "content"],
            properties: {
              type: {
                const: "textbox",
                description: "Defines this step as a user input textbox.",
              },
              title: { type: "string", description: "The title of the step." },
              content: {
                type: "string",
                description: "The body content of the step.",
              },
            },
          },
          {
            type: "object",
            required: ["type", "title", "content", "values", "selectMultiple"],
            properties: {
              type: {
                const: "select",
                description: "Defines this step as a checkbox selection input.",
              },
              title: { type: "string", description: "The title of the step." },
              content: {
                type: "string",
                description: "The body content of the step.",
              },
              selectMultiple: {
                type: "boolean",
                description:
                  "Determines whether users can select more than one option.",
              },
              values: {
                type: "array",
                description:
                  "An array of checkbox values for the user to select.",
                items: {
                  type: "string",
                  description: "An individual option for the checkbox input.",
                },
              },
            },
          },
          {
            type: "object",
            required: ["type", "title", "content"],
            properties: {
              type: {
                const: "image_upload",
                description: "Defines this step as an image upload input.",
              },
              title: { type: "string", description: "The title of the step." },
              content: {
                type: "string",
                description: "The body content of the step.",
              },
            },
          },
          {
            type: "object",
            required: ["type", "title", "content"],
            properties: {
              type: {
                const: "video_upload",
                description: "Defines this step as a video upload input.",
              },
              title: { type: "string", description: "The title of the step." },
              content: {
                type: "string",
                description: "The body content of the step.",
              },
            },
          },
        ],
      },
    },
  },
};

export const Queries = {
  "Chemical Health and Safety Inspection": `Generate a comprehensive and practical workflow for conducting a chemical health and safety inspection in a laboratory or industrial setting.

Structure the workflow clearly using numbered steps. Make it suitable for use by safety officers or EHS (Environmental Health & Safety) personnel. Avoid vague language—focus on clarity and actionable details.
Include a summary at the beginning of the workflow summarising the procedure.`,
  "MOT Inspection": `Create a detailed and comprehensive MOT inspection checklist in the UK that includes all required areas of inspection. The checklist should be organized into these logical categories:

- Vehicle Identification & General Condition
- Lights & Electrical Equipment
- Steering & Suspension
- Brakes
- Tyres & Wheels
- Seatbelts & Restraints
- Body, Structure & General Items
- Exhaust, Emissions & Fuel System
- Drivers’ View of the Road (Mirrors, Wipers, Windscreen, etc.)
- Horn, Registration Plates, and VIN

Ensure that all checks have a "Pass" and "Fail" option.

In the case that a check requires the user to measure or read something, create a follow-up step that asks for the measurement/reading to be entered by the user.

Include a notes slide at the end of the inspection for the user to input any further details.

Include specific items to check under each category, mention any pass/fail criteria where applicable, and format it for easy use by an inspector or technician. Use clear, professional language. This should be compliant with current UK MOT standards.`,
  "Windows Installation Guide": `Create me a detailed Windows 10 installation guide that goes step-by-step through the process for installing Windows 10. Ensure this can be used by technical support staff.

The guide must include:

- Downloading and using the Windows Media Creation Tool to create a bootable installer USB.
- Plugging in and booting from the installer USB.
- Navigating through the installer on the USB.
- Navigating through the first time setup process.
- Any post install instructions.`,
};
