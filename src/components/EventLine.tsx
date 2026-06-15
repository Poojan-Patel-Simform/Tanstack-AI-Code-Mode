import { isRecord } from "@/lib/tool";
import { VMEvent } from "@/types/tool";

type Props = {
  event: VMEvent;
};

const levelClassMap = {
  error: "text-red-600",
  warn: "text-yellow-600",
  info: "text-gray-600",
} as const;

export const EventLine = ({ event }: Props) => {
  if (!isRecord(event.data)) return null;

  const data = event.data;

  switch (event.eventType) {
    case "code_mode:console": {
      const className =
        levelClassMap[data.level as keyof typeof levelClassMap] ??
        "text-gray-600";

      return (
        <div className={className}>
          [{String(data.level)}] {String(data.message)}
        </div>
      );
    }

    case "code_mode:external_call":
      return (
        <div className="text-amber-600">
          → {String(data.function)}({JSON.stringify(data.args)})
        </div>
      );

    case "code_mode:external_result":
      return (
        <div className="text-green-600">
          ← {String(data.function)} ({String(data.duration)}ms)
        </div>
      );

    case "code_mode:external_error":
      return (
        <div className="text-red-600">
          ✗ {String(data.function)}: {String(data.error)}
        </div>
      );

    case "code_mode:execution_started":
      return <div className="text-cyan-600">▶ Execution started</div>;

    default:
      return (
        <div className="text-gray-400">
          {event.eventType}: {JSON.stringify(data)}
        </div>
      );
  }
};
