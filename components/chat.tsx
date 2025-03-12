import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { useEffect, useRef, useState } from "react";

import {
  Chat,
  ChatHistoryRead,
} from "@/api";
import api from "../lib/apis";
import { useAppDispatch } from "@/lib/hooks";
import { setComponentResponse } from "@/lib/appSlice";


interface ChatProps {
  config: Chat;
}

export default function ChatUI({ config }: ChatProps) {
  config.id
  const [chatHistory, setChatHistory] = useState<ChatHistoryRead>();
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const userId = "1aafee69-bd72-4e7c-b7c0-4898581aaf59";
  const [draft, setDraft] = useState("");
  const [messageCount, setMessageCount] = useState(0)
  const dispatch = useAppDispatch()

  function checkChatValid() {
    if (messageCount >= (config.min_messages ?? 0)) {
      dispatch(setComponentResponse({ componentId: config.id, response: 1 }))
    }
  }

  useEffect(checkChatValid, [])


  function handleSendMessage() {
    const newChatHistory = { ...chatHistory } as ChatHistoryRead;


    newChatHistory.messages.push({
      id: "1",
      message: draft.length === 0 ? "placeholder" : draft,
      timestamp: new Date(),
      sender: userId,
      chat: newChatHistory.id!
    });
    setChatHistory(chatHistory);
    setDraft("");
    setMessageCount(messageCount + 1)
    
    setTimeout(scrollToBottom);
    setTimeout(checkChatValid);
  }

  useEffect(() => {
    (async () => {
      const chatHistory = await api.getChatHistory("test")
      setChatHistory(chatHistory);
    })()
  }, []);

  function scrollToBottom() {
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
            <Button color="primary" variant="bordered" onPress={handleSendMessage}>
              Send
            </Button>
          </CardFooter>
        </CardBody>
      )}

    </Card>
  );
}
