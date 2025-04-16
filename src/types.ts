export type StepType = 'info' | 'checkbox' | 'textbox' | 'image_upload' | 'video_upload';

export type BaseStep = {
  type: StepType;
  title: string;
  content: string;
};

export type InfoStep = BaseStep & { type: 'info' };
export type TextboxStep = BaseStep & { type: 'textbox' };
export type ImageUploadStep = BaseStep & { type: 'image_upload' };
export type VideoUploadStep = BaseStep & { type: 'video_upload' };

export type CheckboxStep = BaseStep & {
  type: 'checkbox';
  values: string[];
};

export type Step = InfoStep | TextboxStep | CheckboxStep | ImageUploadStep | VideoUploadStep;

export type Workflow = {
  title: string;
  steps: Step[];
};
