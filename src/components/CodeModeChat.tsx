"use client";

import { Bot, SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import useChatbot from "@/hooks/useChatbot";
import { MessageList } from "./MessageList";

export const CodeModeChat = () => {
  const {
    messages,
    isLoading,
    handleSubmit,
    chatInput,
    setChatInput,
    canSend,
    toolCallEvents,
    isError,
    errorMessage,
  } = useChatbot();

  const messageList = messages.filter((message) => message.parts.length !== 0);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* HEADER */}

      <div className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bot className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">AI Assistant</h2>

              <p className="text-xs text-muted-foreground">Ask anything</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isLoading ? "bg-chart-2 animate-pulse" : "bg-chart-4"
              }`}
            />

            <span className="text-xs text-muted-foreground">
              {isLoading ? "Thinking" : "Ready"}
            </span>
          </div>
        </div>
      </div>

      <MessageList
        messages={messageList}
        toolCallEvents={toolCallEvents}
        isError={isError}
        errorMessage={errorMessage}
      />

      {/* INPUT */}

      <div className="sticky bottom-0 border-t bg-background">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl p-5">
          <div className="flex items-end gap-3 rounded-3xl border bg-card p-3 shadow-sm">
            <Textarea
              rows={1}
              value={chatInput}
              disabled={isLoading}
              placeholder="Message AI Assistant..."
              onChange={(e) => setChatInput(e.target.value)}
              className="border-0 focus-visible:ring-0 max-h-40 flex-1 resize-none bg-transparent px-2 py-2 outline-none placeholder:text-muted-foreground"
            />

            <Button
              size="icon"
              type="submit"
              disabled={!canSend}
              className="size-11 rounded-2xl"
            >
              <SendHorizontal className="size-4" />
            </Button>
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            AI can make mistakes. Verify important information.
          </p>
        </form>
      </div>
    </div>
  );
};
