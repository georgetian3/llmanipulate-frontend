'use client'

import { Button, Input } from "@heroui/react";
import { useEffect, useState } from "react"

export default function TestChatPage() {
  const [websocket, setWebsocket] = useState<WebSocket | undefined>(undefined)
  const [userId, setUserId] = useState("b69edfda-472a-45bd-b76c-a755d3b81a23")
  const [taskId, setTaskId] = useState("2c1ec6b3-df67-45e0-8d0f-99b8f0cd5d4f")
  const [componentId, setComponentId] = useState("f")

  useEffect(() => {
    (async () => {

    })()
  }, [])

  async function handleConnectPressed() {
    if (websocket) {
      await websocket.close()
    }
    const params = new URLSearchParams()
    params.set("user", userId)
    params.set("task", taskId)
    params.set("component", componentId)
    const ws = new WebSocket("ws://localhost:8000/chat?" + params.toString())
    setWebsocket(ws)
  }

  return <div className="flex flex-col gap-4">
    <Input type="text" label="User ID" value={userId} onChange={(event) => setUserId(event.target.value)}></Input>
    <Input type="text" label="Task ID" value={taskId} onChange={(event) => setTaskId(event.target.value)}></Input>
    <Input type="text" label="Component ID" value={componentId} onChange={(event) => setComponentId(event.target.value)}></Input>
    <Button onPress={handleConnectPressed}>
      Connect
    </Button>
  </div>
}