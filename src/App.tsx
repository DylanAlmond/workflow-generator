import { useCallback, useState } from 'react';
import { ChatOllama } from '@langchain/ollama';
import { WorkflowSchema, SystemPrompt, DefaultQuery, TESTWORKFLOW } from './constants';
import { Workflow } from './types';
import WorkflowComponent from './components/WorkflowComponent';
import './App.css';

const llm = new ChatOllama({
  model: 'llama3.2',
  temperature: 0
}).withStructuredOutput(WorkflowSchema);

const App = () => {
  const [query, setQuery] = useState<string>(DefaultQuery);
  const [result, setResult] = useState<Workflow | null>(TESTWORKFLOW);

  const GenerateResult = useCallback(async () => {
    const formattedPrompt = await SystemPrompt.formatMessages({
      context: '',
      query
    });

    const response = (await llm.invoke(formattedPrompt)) as Workflow;

    console.log(response);

    setResult(response);
  }, [query]);

  return (
    <div>
      <h1>Procedure Generator</h1>

      {result ? <WorkflowComponent workflow={result} /> : <p>No Workflow.</p>}

      <textarea
        value={query}
        onInput={(e) => setQuery((e.target as HTMLTextAreaElement).value)}
        rows={20}
        cols={60}
      ></textarea>

      <button onClick={GenerateResult}>Generate Procedure</button>
    </div>
  );
};

export default App;

