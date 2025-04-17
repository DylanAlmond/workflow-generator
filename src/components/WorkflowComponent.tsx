import { memo, useEffect, useMemo, useState } from 'react';
import { Step, Workflow } from '../types';
import { Converter } from 'showdown';

interface WorkflowComponentProps {
  workflow: Workflow;
}

const converter = new Converter();

const WorkflowComponent = ({ workflow }: WorkflowComponentProps) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = useMemo<Step>(
    () => workflow.steps[activeStepIndex],
    [activeStepIndex, workflow.steps]
  );

  useEffect(() => {
    setActiveStepIndex(0);
  }, [workflow]);

  if (!activeStep) return null;

  return (
    <div style={{ padding: '2rem', border: '2px solid grey' }}>
      <h2>{workflow.title}</h2>

      <section style={{ display: 'flex', flexDirection: 'column' }}>
        <h3>
          {activeStep.title} - {activeStep.type}
        </h3>

        <div
          style={{ textAlign: 'left' }}
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(activeStep.content) }}
        />

        {activeStep.type === 'select' ? (
          activeStep.values.map((v) => (
            <label key={v}>
              {v}
              <input
                type={activeStep.selectMultiple ? 'checkbox' : 'radio'}
                name={activeStep.title}
                id=''
              />
            </label>
          ))
        ) : activeStep.type === 'textbox' ? (
          <input type='text' name='' id='' />
        ) : activeStep.type === 'image_upload' ? (
          <div>
            <p>Image Upload</p>
            <input type='file' name='' id='' />
          </div>
        ) : activeStep.type === 'video_upload' ? (
          <div>
            <p>Video Upload</p>
            <input type='file' name='' id='' />
          </div>
        ) : null}
      </section>

      <nav style={{ display: 'flex', gap: '2rem' }}>
        <button
          type='button'
          disabled={!activeStepIndex}
          onClick={() => setActiveStepIndex((prev) => prev - 1)}
        >
          Prev
        </button>
        <button
          type='button'
          disabled={activeStepIndex === workflow.steps.length - 1}
          onClick={() => setActiveStepIndex((prev) => prev + 1)}
        >
          Next
        </button>
      </nav>
    </div>
  );
};

export default memo(WorkflowComponent);
