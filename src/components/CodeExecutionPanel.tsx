import { VMEvent } from "@/types/tool";
import Editor from "@monaco-editor/react";
import { EventLine } from "./EventLine";
import { ToolCallPart } from "@tanstack/ai";

type PropsType = {
  toolCallEvents: Map<string, Array<VMEvent>>;
  part: ToolCallPart;
};

export const CodeExecutionPanel = ({ part, toolCallEvents }: PropsType) => {
  const events = toolCallEvents.get(part.id) || [];
  const result = part.output;

  const code = part.arguments;
  const isRunning = !result;

  return (
    <div className="border rounded-lg overflow-hidden my-2">
      {/* Generated code */}
      {code && (
        <details open>
          <summary className="px-3 py-2 bg-gray-100 font-mono text-sm cursor-pointer">
            TypeScript code
          </summary>
          <Editor
            height="30vh"
            defaultLanguage="javascript"
            defaultValue={JSON.parse(code).typescriptCode}
          />
        </details>
      )}

      {/* Live event stream */}
      {events.length > 0 && (
        <div className="border-t px-3 py-2">
          <div className="text-xs font-semibold text-gray-500 mb-1">
            Execution log
          </div>
          <div className="space-y-1 font-mono text-xs">
            {events.map((event) => (
              <EventLine key={event.id} event={event} />
            ))}
            {isRunning && (
              <div className="text-blue-500 animate-pulse">Running...</div>
            )}
          </div>
        </div>
      )}

      {/* Final result */}
      {result && (
        <div
          className={`border-t px-3 py-2 text-sm ${
            result.success ? "bg-green-50" : "bg-red-50"
          }`}
        >
          {result.error && (
            <div className="text-red-700">Error: {result.error.message}</div>
          )}
          {result.logs && result.logs.length > 0 && (
            <pre className="text-gray-600 text-xs mt-1">
              {result.logs.join("\n")}
            </pre>
          )}
          {result.success && result.result !== undefined && (
            <pre className="text-green-800 text-xs mt-1">
              {JSON.stringify(result.result, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};
