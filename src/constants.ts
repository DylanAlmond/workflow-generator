import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { Workflow } from './types';

export const SystemPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `You are a structured workflow generation assistant. 
    Your task is to create clear, complete, and logically ordered workflows in response to user queries.
    Rules: 
      - Each workflow must be broken into discrete steps, each with a type, title, and descriptive content.
      - Any step which does not need user input must be a "info" step type.
      - Any step which requires a user to "note", "report", "record", etc. any information must be a "textbox" step type.
      - Any step which requires a user to "take" or "record" any media must be either a "image_upload" or "video_upload" step type.
      - Any step which requires a user to "select", "choose", or "confirm" 1 or more conditions must be a "checkbox" step type.
      - Checkbox steps must have a valid "values" array with at least 1 item, all other step types must have an empty "values" array.
      - Do not repeat checkbox "values" in a steps content.
    `
  ],
  ['human', 'Context:\n{context}\n\nQuery: {query}']
]);

export const DefaultQuery = `Generate a comprehensive and practical workflow for conducting a chemical health and safety inspection in a laboratory or industrial setting.

Structure the workflow clearly using numbered steps. Make it suitable for use by safety officers or EHS (Environmental Health & Safety) personnel. Avoid vague language—focus on clarity and actionable details.
Include a summary at the beginning of the workflow summarising the procedure.
`;

// Schema for Step
export const StepSchema = z.object({
  type: z.enum(['info', 'textbox', 'checkbox', 'image_upload', 'video_upload']),
  title: z.string(),
  content: z.string(),
  values: z.array(z.string()).optional()
});

// Workflow schema
export const WorkflowSchema = z.object({
  title: z.string(),
  steps: z.array(StepSchema)
});

export const TESTWORKFLOW: Workflow = {
  title: 'Chemical Health and Safety Inspection Workflow',
  steps: [
    {
      type: 'info',
      title: 'Pre-Inspection Preparation',
      content:
        "Before starting the inspection, review the laboratory or industrial setting's chemical inventory, safety data sheets (SDS), and relevant regulations. Ensure all necessary personal protective equipment (PPE) is available and easily accessible."
    },
    {
      type: 'checkbox',
      title: 'Identify High-Risk Areas',
      content:
        'Determine which areas of the laboratory or industrial setting pose the greatest risk to personnel, such as areas with high concentrations of hazardous chemicals or equipment that requires special handling procedures.',
      values: ['Chemical storage areas', 'Equipment maintenance areas', 'Waste disposal areas']
    },
    {
      type: 'info',
      title: 'Conduct Visual Inspection',
      content:
        'Perform a visual inspection of the laboratory or industrial setting to identify any potential hazards, such as spills, leaks, or equipment malfunctions.'
    },
    {
      type: 'textbox',
      title: 'Record Observations',
      content:
        'Document any observations or concerns during the visual inspection, including photographs or videos if necessary.'
    },
    {
      type: 'checkbox',
      title: 'Verify Chemical Storage and Handling Procedures',
      content:
        'Check that chemical storage and handling procedures are being followed, including proper labeling, segregation, and disposal of hazardous waste.',
      values: ['Chemical storage areas', 'Equipment maintenance areas']
    },
    {
      type: 'info',
      title: 'Inspect Equipment and Machinery',
      content:
        'Verify that equipment and machinery are in good working condition, properly maintained, and meet regulatory requirements.'
    },
    {
      type: 'checkbox',
      title: 'Check for Proper Ventilation and Exhaust Systems',
      content:
        'Ensure that ventilation and exhaust systems are functioning properly to prevent the accumulation of hazardous fumes or gases.',
      values: ['Chemical storage areas', 'Equipment maintenance areas']
    },
    {
      type: 'info',
      title: 'Review Safety Data Sheets (SDS)',
      content: 'Verify that SDSs for all chemicals in use are up-to-date and readily available.'
    },
    {
      type: 'checkbox',
      title: 'Confirm Training and Competency of Personnel',
      content:
        'Ensure that personnel have received proper training and are competent to handle hazardous materials and equipment.',
      values: ['Chemical storage areas', 'Equipment maintenance areas']
    },
    {
      type: 'info',
      title: 'Document Inspection Findings',
      content:
        'Compile a comprehensive report of the inspection findings, including any recommendations for improvement or corrective actions.'
    },
    {
      type: 'image_upload',
      title: 'Attach Supporting Documents (e.g., photographs, videos, SDSs)',
      content:
        'Upload supporting documents to facilitate review and reference during future inspections.'
    }
  ]
};
