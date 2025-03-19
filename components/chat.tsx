import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { useEffect, useRef, useState } from "react";

import {
  ChatConfig,
  ChatMessageRead,
  WebsocketReceive,
  WebsocketSend,
} from "@/api";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCurrentTask, selectCurrentUser, setComponentResponse } from "@/lib/appSlice";


interface ChatProps {
  config: ChatConfig;
}

export default function ChatUI({ config }: ChatProps) {
  const [chatHistory, setChatHistory] = useState<ChatMessageRead[]>([]);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const [draft, setDraft] = useState("");
  const [messageCount, setMessageCount] = useState(0)
  const dispatch = useAppDispatch()

  const currentTask = useAppSelector(selectCurrentTask)
  const currentUser = useAppSelector(selectCurrentUser)
  const [me, setMe] = useState<string>("")

  const [websocket, setWebsocket] = useState<WebSocket | undefined>(undefined)

  useEffect(() => {
    (async () => {
      await connectWebsocket()
    })()
  }, [])

  async function connectWebsocket() {
    if (websocket) {
      await websocket.close()
    }
    if (!currentTask || !currentUser) {
      console.error("Chat no user or task")
      return
    }
    const params = new URLSearchParams()
    params.set("user", currentUser.id)
    params.set("task", currentTask.id)
    params.set("component", config.id)
    try {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_CHAT_URL}?${params.toString()}`)
      ws.onopen = () => {
        console.log(`Websocket open: user ${currentUser.id} task ${currentTask.id} component ${config.id}`)
      }
      ws.onmessage = (event) => {
        const eventData = JSON.parse(event.data) as WebsocketSend
        console.log(`Websocket message for user ${currentUser.id} task ${currentTask.id} component ${config.id}: ${JSON.stringify(event.data)}`)
        console.log("got messages", eventData.messages)
        const ids = new Set();
        setChatHistory([...chatHistory, ...(eventData.messages ?? [])].filter(message => !ids.has(message.id) && ids.add(message.id)))
        // .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()))
      }
      ws.onerror = (event) => {
        console.error(`Websocket error for user ${currentUser.id} task ${currentTask.id} component ${config.id}: ${JSON.stringify(event)}`)
      }
      ws.onclose = () => {
        console.log(`Websocket close: for user ${currentUser.id} task ${currentTask.id} component ${config.id}`)
      }
      setWebsocket(ws)
    } catch (e) {
      console.error("Error connecting to websocket", e)
    }
  }

  function checkChatValid() {
    if (messageCount >= (config.min_messages ?? 0)) {
      dispatch(setComponentResponse({ componentId: config.id, response: 1 }))
    }
  }
  useEffect(checkChatValid, [])


  function handleSendMessage() {
    websocket?.send(JSON.stringify({ user_id: currentUser?.id, message: draft, typing: false } as WebsocketReceive))
    setDraft("");
    setMessageCount(messageCount + 1)
    setTimeout(scrollToBottom);
    setTimeout(checkChatValid);
  }

  console.log(chatHistory)

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
              {chatHistory
                .map((message, index) => {
                  return (
                    <div
                      key={index}
                      className={`rounded-xl p-2 w-fit max-w-sm ${message.sender == me ? "bg-primary-500 text-primary-foreground self-end" : "bg-neutral-200 dark:bg-neutral-800"}`}
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
