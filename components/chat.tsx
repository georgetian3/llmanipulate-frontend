import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  ChatConfig,
  ChatMessageRead,
  WebsocketReceive,
  WebsocketSend,
} from "@/api";

import { useAppSelector } from "@/lib/hooks";
import { selectCurrentTask, selectCurrentUser } from "@/lib/appSlice";


interface ChatProps {
  config: ChatConfig;
}

export default function ChatUI({ config }: ChatProps) {
  const [websocket, setWebsocket] = useState<WebSocket | undefined>(undefined)
  const [chatHistory, setChatHistory] = useState<ChatMessageRead[]>([]);
  const [draft, setDraft] = useState("");
  const [me, setMe] = useState<string>("")
  const currentTask = useAppSelector(selectCurrentTask)
  const currentUser = useAppSelector(selectCurrentUser)
  const chatBoxRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    (async () => {
      await connectWebsocket()
    })()
    return websocket?.close
  }, [])

  const connectWebsocket = useCallback(async () => {
    if (websocket) {
      await websocket.close()
    }
    if (!currentTask || !currentUser) {
      console.error("Chat no user or task")
      return
    }
    const params = new URLSearchParams({
      user: currentUser.id,
      task: currentTask.id,
      component: config.id,
    })
    try {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_CHAT_URL}?${params.toString()}`)
      ws.onopen = wsOnOpen
      ws.onmessage = wsOnMessage
      ws.onerror = wsOnError
      ws.onclose = wsOnClose
      setWebsocket(ws)
    } catch (e) {
      console.error("Error connecting to websocket", e)
    }
  }, [currentTask, currentUser, config])

  const wsOnOpen = useCallback(() => {
    console.log(`Websocket open: user ${currentUser?.id} task ${currentTask?.id} component ${config.id}`)
  }, [currentUser, currentTask, config])

  const wsOnMessage = useCallback((event: MessageEvent) => {
    const eventData = JSON.parse(event.data) as WebsocketSend
    console.log(`Websocket message for user ${currentUser?.id} task ${currentTask?.id} component ${config.id}: ${JSON.stringify(event.data)}`)
    setChatHistory(
      chatHistory => {
        const ids = new Set()
        return [...chatHistory, ...(eventData.messages ?? [])]
          // filter duplicate messages via id
          .filter(message => !ids.has(message.id) && ids.add(message.id))
          // timestamp is string, convert into date
          .map(message => { return { ...message, timestamp: new Date(message.timestamp) } })
          // sort in ascending order
          .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      }
    )
  }, [currentUser, currentTask, config])

  const wsOnError = useCallback((event: Event) => {
    console.error(`Websocket error for user ${currentUser?.id} task ${currentTask?.id} component ${config.id}: ${JSON.stringify(event)}`)
  }, [currentUser, currentTask, config])

  const wsOnClose = useCallback(() => {
    console.log(`Websocket close: for user ${currentUser?.id} task ${currentTask?.id} component ${config.id}`)
  }, [currentUser, currentTask, config])

  const handleSendMessage = useCallback(async () => {
    if (!websocket || !websocket.readyState) {
      await connectWebsocket()
    }
    websocket?.send(JSON.stringify({ user_id: currentUser?.id, message: draft, typing: false } as WebsocketReceive))
    setDraft("");
    setTimeout(scrollToBottom);
  }, [websocket, draft, currentUser]);

  function scrollToBottom() {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
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
