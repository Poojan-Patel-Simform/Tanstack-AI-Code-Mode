import { ToolMessage, VMEvent } from "@/types/tool";
import { CodeExecutionPanel } from "./CodeExecutionPanel";
import { TextMessage } from "./TextMessage";
import { Avatar, AvatarFallback } from "./ui/avatar";

type PropsType = {
  message: ToolMessage;
  toolCallEvents: Map<string, VMEvent[]>;
};

export const Message = ({ message, toolCallEvents }: PropsType) => {
  const renderPart = (part: ToolMessage["parts"][number], index: number) => {
    switch (part.type) {
      case "text":
        return (
          <TextMessage key={`${part.id ?? index}`} message={part.content} />
        );

      case "tool-call":
        if (part.name) {
          return (
            <CodeExecutionPanel
              key={`${part.id ?? index}`}
              part={part}
              toolCallEvents={toolCallEvents}
            />
          );
        }
        return null;

      default:
        return null;
    }
  };

  const role = message.role ?? "assistant";

  if (role === "user") {
    return (
      <div className="flex justify-end px-4">
        <div className="rounded-2xl bg-primary text-primary-foreground p-3 max-w-[70%] animate-in fade-in slide-in-from-bottom">
          {message.parts.map((element, index) => renderPart(element, index))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 px-4">
      <Avatar size="sm">
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div className="rounded-2xl bg-muted p-3 text-muted-foreground max-w-[70%] animate-in fade-in slide-in-from-left">
        {message.parts.map((element, index) => renderPart(element, index))}
      </div>
    </div>
  );
};
