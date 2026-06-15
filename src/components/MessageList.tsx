"use client";

import React, { useEffect, useRef } from "react";
import { ToolMessage, VMEvent } from "@/types/tool";
import { Message } from "./Message";
import { Bot } from "lucide-react";

type PropsType = {
  messages: ToolMessage[];
  toolCallEvents: Map<string, Array<VMEvent>>;
  isError?: boolean;
  errorMessage: string | null;
};

export const MessageList = ({
  messages,
  toolCallEvents,
  isError,
  errorMessage,
}: PropsType) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Auto-scroll to bottom when messages change
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  return (
    <div ref={containerRef} role="log" className="chat-scroll">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          toolCallEvents={toolCallEvents}
        />
      ))}
      {isError && (
        <div className="flex gap-3">
          <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl bg-destructive text-destructive-foreground">
            <Bot className="size-4" />
          </div>

          <div className="max-w-[80%] rounded-3xl border border-destructive/30 bg-destructive/10 px-5 py-4 text-destructive">
            {errorMessage || "Something went wrong."}
          </div>
        </div>
      )}
    </div>
  );
};
