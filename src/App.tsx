import { useCallback, useState } from 'react';
import { ChatOllama } from '@langchain/ollama';
import { WorkflowSchema, SystemPrompt, Queries } from './constants';
import { Workflow } from './types';
import WorkflowComponent from './components/WorkflowComponent';

const llm = new ChatOllama({
  model: 'granite3.3:8b',
  temperature: 0
}).withStructuredOutput(WorkflowSchema);

const App = () => {
  const [query, setQuery] = useState<string>(Queries.mot);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<Workflow | null>(null);

  const GenerateResult = useCallback(async () => {
    setLoading(true);

    const formattedPrompt = await SystemPrompt.formatMessages({
      context: '',
      query
    });

    const response = (await llm.invoke(formattedPrompt)) as Workflow;

    console.log(response);

    setLoading(false);
    setResult(response);
  }, [query]);

  return (
    <div>
      <h1>Procedure Generator</h1>

      {result ? <WorkflowComponent workflow={result} /> : <p>No Procedure.</p>}

      <label htmlFor=''>
        <span>Template</span>
        <select
          onInput={(e) =>
            setQuery(Queries[(e.target as HTMLSelectElement).value as keyof typeof Queries])
          }
        >
          {Object.keys(Queries).map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </label>

      <textarea
        value={query}
        onInput={(e) => setQuery((e.target as HTMLTextAreaElement).value)}
        rows={20}
        cols={60}
      ></textarea>

      <button onClick={GenerateResult} disabled={loading}>
        {loading ? 'Generating' : 'Generate Procedure'}
      </button>
    </div>
  );
};

export default App;
