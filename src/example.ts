import { Workflow } from './types';

export const example: Workflow = {
  title: 'UK MOT Inspection Checklist',
  steps: [
    {
      type: 'textbox',
      title: 'Vehicle Identification & General Condition',
      content:
        "Check the vehicle's identification number (VIN) is correct and legible.\n\nPass/Fail Criteria: Correct VIN, incorrect VIN"
    },
    {
      type: 'checkbox',
      title:
        'Check for any signs of damage or wear on the bodywork.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      content:
        'Check for any scratches, dents, or rust. Check for any signs of repainting or touch-ups.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        'Check the condition of the tyres and wheels.\n\nPass/Fail Criteria: Tyres are in good condition, Tyres are worn out',
      content:
        'Check tread depth (minimum 1.6mm).\n\nPass/Fail Criteria: Tread depth is above 1.6mm, tread depth is below 1.6mm',
      multipleChoice: false,
      values: ['Yes', 'No']
    },
    {
      type: 'checkbox',
      title:
        'Check the condition of the wheels.\n\nPass/Fail Criteria: Wheels are in good condition, Wheels are damaged',
      content:
        'Check for any signs of damage or wear.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        "Check the condition of the vehicle's suspension and steering components.\n\nPass/Fail Criteria: Components are in good condition, Components are damaged",
      content:
        'Check for any signs of wear or damage on the shock absorbers, struts, and springs.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        "Check the condition of the vehicle's brakes.\n\nPass/Fail Criteria: Brakes are in good condition, Brakes are faulty",
      content:
        'Check for any signs of wear or damage on the brake pads and discs.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        "Check the condition of the vehicle's seatbelts and restraints.\n\nPass/Fail Criteria: Seatbelts are in good condition, Seatbelts are faulty",
      content:
        'Check for any signs of wear or damage on the seatbelts and restraints.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        "Check the condition of the vehicle's body, structure, and general items.\n\nPass/Fail Criteria: Items are in good condition, Items are damaged",
      content:
        'Check for any signs of wear or damage on the door handles, mirrors, and other general items.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        "Check the condition of the vehicle's exhaust system.\n\nPass/Fail Criteria: System is in good condition, System is faulty",
      content:
        'Check for any signs of leaks or damage on the exhaust system.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        "Check the condition of the vehicle's emissions and fuel system.\n\nPass/Fail Criteria: System is in good condition, System is faulty",
      content:
        'Check for any signs of leaks or damage on the fuel system.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        "Check the condition of the vehicle's drivers' view of the road (mirrors, wipers, windscreen, etc.).\n\nPass/Fail Criteria: View is clear, View is obstructed",
      content:
        'Check for any signs of damage or wear on the mirrors and wipers.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        "Check the condition of the vehicle's horn.\n\nPass/Fail Criteria: Horn is in good working order, Horn is faulty",
      content:
        'Check for any signs of damage or wear on the horn.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        "Check the condition of the vehicle's registration plates.\n\nPass/Fail Criteria: Plates are in good condition, Plates are damaged",
      content:
        'Check for any signs of damage or wear on the registration plates.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'checkbox',
      title:
        "Check the condition of the vehicle's VIN (Vehicle Identification Number).\n\nPass/Fail Criteria: VIN is correct and legible, VIN is incorrect or illegible",
      content:
        'Check for any signs of damage or wear on the VIN.\n\nPass/Fail Criteria: No significant damage or wear, significant damage or wear',
      multipleChoice: false,
      values: ['No', 'Yes']
    },
    {
      type: 'textbox',
      title: 'Notes',
      content: "Any additional notes or comments regarding the vehicle's condition."
    }
  ]
};
