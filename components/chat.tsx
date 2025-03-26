import { Button } from "@heroui/react";
import { Card, CardBody, CardFooter } from "@heroui/react";
import { Textarea } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ChatConfig,
  ChatMessageRead,
  WebsocketReceive,
  WebsocketSend,
} from "@/api";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectCurrentTask, selectCurrentUser, setComponentResponse } from "@/lib/appSlice";
import { Avatar, Tooltip } from "@heroui/react";


interface ChatProps {
  config: ChatConfig;
}

export default function ChatUI({ config }: ChatProps) {
  const [websocket, setWebsocket] = useState<WebSocket | undefined>(undefined)
  const [wsConnected, setWsConnected] = useState(false)
  const [chatHistory, setChatHistory] = useState<ChatMessageRead[]>([]);
  const [draft, setDraft] = useState("");
  const [me, setMe] = useState<string>("")
  const currentTask = useAppSelector(selectCurrentTask)
  const currentUser = useAppSelector(selectCurrentUser)
  const chatBoxRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch()

  const wsOnOpen = useCallback(() => {
    console.log(`Websocket open: user ${currentUser?.id} task ${currentTask?.id} component ${config.id}`)
    setWsConnected(true)
  }, [currentUser, currentTask, config])

  const wsOnMessage = useCallback((event: MessageEvent) => {
    const eventData = JSON.parse(event.data) as WebsocketSend
    console.log(`Websocket message for user ${currentUser?.id} task ${currentTask?.id} component ${config.id}: ${JSON.stringify(event.data)}`)
    if (eventData.me) {
      setMe(eventData.me)
    }
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
    setWsConnected(false)
  }, [currentUser, currentTask, config])

  const wsOnClose = useCallback(() => {
    console.log(`Websocket close: for user ${currentUser?.id} task ${currentTask?.id} component ${config.id}`)
    setWsConnected(false)
  }, [currentUser, currentTask, config, setWsConnected])

  const connectWebsocket = useCallback(async () => {
    setWsConnected(false)
    if (websocket) {
      try {
        await websocket.close()
      } catch { }
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
  }, [currentTask, currentUser, config, websocket, wsOnOpen, wsOnMessage, wsOnError, wsOnClose])

  useEffect(() => {
    (async () => {
      await connectWebsocket()
    })()
    return () => {
      try {
        websocket?.close()
      } catch { }
    }
  }, [])


  const handleSendMessage = useCallback(async () => {
    if (!websocket || !websocket.readyState) {
      await connectWebsocket()
    }
    if (!draft.trim()) {
      return
    }
    websocket?.send(JSON.stringify({ user_id: currentUser?.id, message: draft, typing: false } as WebsocketReceive))
    setDraft("");
    setTimeout(scrollToBottom);
  }, [websocket, draft, currentUser, connectWebsocket]);

  function scrollToBottom() {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }

  function completed() {
    if (true || chatHistory.length >= (config.min_messages ?? 0)) {
      dispatch(setComponentResponse({ componentId: config.id, response: 1 }))
    }
  }

  useEffect(completed, [chatHistory.length, config.min_messages, config.id, dispatch])

  useEffect(() => scrollToBottom(), [chatHistory]);

  return (
    <Card className="max-h-[75vh]">
      {chatHistory && (
        <CardBody className="gap-4">
          <div ref={chatBoxRef} className="overflow-auto p-4">
            <div className="gap-1 flex flex-col justify-end">
              {chatHistory
                .map((message, index) => {
                  const isMe = message.sender === me
                  return (
                    <div
                      className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""}`}
                      key={index}
                    >
                      <Tooltip content={message.sender}>
                        <Avatar
                          size="sm"
                          name={message.sender // show initials
                            .split(" ")
                            .filter(word => word.length > 0)
                            .map(word => word[0].toUpperCase())
                            .join('')
                          }
                        />
                      </Tooltip>
                      <div
                        className={`rounded-xl p-2 w-fit max-w-sm ${isMe ? "bg-primary-500 text-primary-foreground self-end" : "bg-neutral-200 dark:bg-neutral-800"}`}
                      >
                        {message.message}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </CardBody>
      )}
      <CardFooter className="flex gap-4 p-4 mb-2">
        {
          wsConnected
            ? <div className="flex gap-2 flex-5 flex-nowrap justify-center">

              <div className="text-success">●</div>
              <div>Connected</div>
            </div>
            : <div className="flex gap-2 flex-5 flex-nowrap items-center">
              <div className="text-danger">●</div>
              <div>Disconnected</div>
              <Button variant="bordered" onPress={connectWebsocket}>
                Reconnect
              </Button>
            </div>
        }
        <Textarea
          maxRows={1}
          minRows={1}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => event.key == "Enter" && handleSendMessage()}
        />
        <Button color="primary" variant="bordered" onPress={handleSendMessage}>
          Send
        </Button>
      </CardFooter>
    </Card>
  );
}
