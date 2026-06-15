"use client";

import { VMEvent } from "@/types/tool";
import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
import { SubmitEvent, useCallback, useMemo, useRef, useState } from "react";

const useChatbot = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [toolCallEvents, setToolCallEvents] = useState<
    Map<string, Array<VMEvent>>
  >(new Map());
  const eventIdCounter = useRef(0);

  const handleCustomEvent = useCallback(
    (eventType: string, data: unknown, context: { toolCallId?: string }) => {
      const { toolCallId } = context;
      if (!toolCallId) return;

      const event: VMEvent = {
        id: `event-${eventIdCounter.current++}`,
        eventType,
        data,
        timestamp: Date.now(),
      };

      setToolCallEvents((prev) => {
        const next = new Map(prev);
        const events = next.get(toolCallId) || [];
        next.set(toolCallId, [...events, event]);
        return next;
      });
    },
    [],
  );

  const {
    messages,
    sendMessage,
    isLoading: isMessagesLoading,
  } = useChat({
    connection: fetchServerSentEvents("/api/chat"),
    onCustomEvent: handleCustomEvent,
    onError: (err) => {
      setError(err.message || "An error occurred while sending the message.");
    },
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSend) return;

    setError(null);
    const text = input.trim();
    setInput("");

    try {
      await sendMessage(text);
    } catch {
      setError("Failed to send message. Please try again.");
    }
  };

  const isToolRunning = useMemo(() => {
    const lastMessage = messages.at(-1);
    if (lastMessage?.role !== "assistant") return false;

    return lastMessage.parts.some(
      (p) =>
        p.type === "tool-call" &&
        (p.state === "awaiting-input" || p.state === "input-streaming"),
    );
  }, [messages]);

  const isLoading = isMessagesLoading || isToolRunning;

  const canSend = input.trim().length > 0 && !isLoading;

  return {
    messages,
    isLoading,
    isMessagesLoading,
    isToolRunning,
    handleSubmit,
    isError: !!error,
    errorMessage: error,
    chatInput: input,
    setChatInput: setInput,
    canSend,
    toolCallEvents,
  };
};

export default useChatbot;
