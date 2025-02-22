import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { useEffect, useRef, useState } from "react";

import {
  Chat,
  ChatApi,
  ChatHistory,
  createConfiguration,
  ServerConfiguration,
} from "@/api";

interface FreeTextProps {
  config: Chat;
}

const chatApi = new ChatApi(
  createConfiguration({
    baseServer: new ServerConfiguration("http://localhost:8000", {}),
  }),
);

export default function ChatUI({ config }: FreeTextProps) {
  const [chatHistory, setChatHistory] = useState<ChatHistory>();
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const userId = "1";
  const [draft, setDraft] = useState("");

  function sendMessage() {
    const newChatHistory = { ...chatHistory } as ChatHistory;

    newChatHistory.messages.push({
      id: "1",
      message: draft.length === 0 ? "placeholder" : draft,
      timestamp: new Date(),
      sender: userId,
    });
    setChatHistory(chatHistory);
    setDraft("");
    setTimeout(() => scrollToBottom());
  }

  useEffect(() => {
    chatApi
      .getChat("test")
      .then((chatHistory: ChatHistory) => {
        setChatHistory(chatHistory);
      })
      .catch((reason) => console.log("Error getting task config", reason));
  }, []);

  function scrollToBottom() {
    console.log("scrolling to bottom");
    if (chatBoxRef && chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current!.scrollHeight;
    }
  }

  useEffect(() => scrollToBottom(), [chatHistory]);

  return (
    <Card className="max-h-[75vh]">
      {chatHistory && (
        <CardBody className="gap-4">
          <div ref={chatBoxRef} className="overflow-auto p-4">
            <div className="gap-1 flex flex-col justify-end">
              {chatHistory.messages
                .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
                .map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`rounded-xl p-2 w-fit max-w-sm ${message.sender == userId ? "bg-primary-500 text-primary-foreground self-end" : "bg-neutral-200 dark:bg-neutral-800"}`}
                    >
                      {message.message}
                    </div>
                  );
                })}
            </div>
          </div>
          <CardFooter className="flex gap-2">
            <Textarea
              maxRows={1}
              minRows={1}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
            <Button color="primary" variant="bordered" onPress={sendMessage}>
              Send
            </Button>
          </CardFooter>
        </CardBody>
      )}
      
    </Card>
  );
}
