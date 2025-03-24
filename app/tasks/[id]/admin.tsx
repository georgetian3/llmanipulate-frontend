import { Key, useEffect, useState } from "react"
import { TaskParams } from "./page"
import { ChatReadAdmin, TaskParticipantRead, TaskRead, TaskResponseRead } from "@/api"
import api from "@/lib/apis"
import { Centered, CenteredSpinner } from "@/components/common"
import { Button, Chip, Code, Input, Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs } from "@heroui/react"
import { Editor } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { DeleteIcon, PlusIcon } from "@/components/icons"

interface TaskReadProp {
  task: TaskRead
}

function ConfigTab({ task }: TaskReadProp) {
  const { theme } = useTheme()
  return (
    <div
      className="h-[calc(100vh-10rem)]"
    >
      <Editor
        theme={theme === "light" ? "light" : "vs-dark"}
        defaultLanguage="json"
        defaultValue={JSON.stringify(task.config, null, 2)}
        options={{
          readOnly: true
        }}
      />
    </div>
  )
}


function ResponsesTab({ task }: TaskReadProp) {
  const [responses, setResponses] = useState<TaskResponseRead[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const columns = [
    { name: "userId", label: "User ID" },
    { name: "response", label: "Response" },
    { name: "created", label: "Created" }
  ]

  useEffect(() => {
    (async () => {
      setLoading(true)
      setResponses(await api.getTaskResponses(task.id!))
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return <CenteredSpinner />
  }

  if (responses === undefined) {
    return <Centered>
      Cannot fetch responses
    </Centered>
  }


  function renderCell(response: TaskResponseRead, column: Key) {
    switch (column) {
      case "userId":
        return (
          <Code>
            {response.user_id}
          </Code>
        )
      case "response":
        return (
          <div>
            {JSON.stringify(response.response)}
          </div>
        )
      case "created":
        return (
          <div>
            {response.created_timestamp ? response.created_timestamp.toISOString() : ""}
          </div>
        )
      default:
        return ""
    }
  }

  return (
    <div>
      <Table
        isHeaderSticky
        classNames={{ base: "h-[calc(100vh-6rem)] pt-4" }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.name} align={"start"}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No responses"} items={responses}>
          {(item) => (
            <TableRow key={item.user_id}>
              {(column) => <TableCell>{renderCell(item, column)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

const uuid4Regex = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[89ab][0-9a-f]{3}-?[0-9a-f]{12}$/i
function isValidUuid4(value: string) {
  return !!value.match(uuid4Regex)
}

function ParticipantsTab({ task }: TaskReadProp) {

  const [participants, setParticipants] = useState<TaskParticipantRead[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [participantId, setParticipantId] = useState("")
  const validParticipantId = participantId ? isValidUuid4(participantId) : undefined
  const columns = [
    { name: "userId", label: "User ID" },
    { name: "completed", label: "Completed" },
    { name: "actions", label: "Actions" },
  ]

  async function getTaskParticipants() {
    setLoading(true)
    setParticipants(await api.getTaskParticipants(task.id!))
    setLoading(false)
  }

  useEffect(() => {
    (async () => {
      await getTaskParticipants()
    })()
  }, [])

  if (loading) {
    return <CenteredSpinner />
  }

  if (participants === undefined) {
    return <Centered>
      Cannot fetch participants
    </Centered>
  }

  async function createParticipant() {
    // if (await api.createTaskParticipant(task.id!, participantId ? participantId : undefined)) {
    //   await getTaskParticipants()
    // } else {
    console.log("Error creating participant")
    // }
  }

  const topContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full"
          placeholder="Enter a valid UUID4 to make a user this task's participant, or leave empty to create a new user."
          value={participantId}
          onClear={() => setParticipantId("")}
          onValueChange={(value) => setParticipantId(value ?? "")}
        />
        <div className="flex gap-3">
          <Button isDisabled={validParticipantId === false} color="primary" endContent={<PlusIcon />} onPress={createParticipant}>
            Create {!participantId && "random"}
          </Button>
        </div>
      </div>

    </div>
  )


  function renderCell(participant: TaskParticipantRead, column: Key) {
    switch (column) {
      case "userId":
        return (
          <Code>
            {participant.user_id}
          </Code>
        )
      case "completed":
        return (
          <div>
            {participant.completed
              ? <Chip color="success">Yes</Chip>
              : <Chip color="danger">No</Chip>
            }
          </div>
        )
      case "actions":
        return (
          <div>
            <Button color="danger" isIconOnly>
              <DeleteIcon />
            </Button>
          </div>
        )
      default:
        return ""
    }
  }

  return (
    <div>
      <Table
        isHeaderSticky
        topContent={topContent}
        topContentPlacement="outside"
        classNames={{ base: "h-[calc(100vh-6rem)] pt-4" }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.name} align={"start"}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No participants"} items={participants}>
          {(item) => (
            <TableRow key={item.user_id}>
              {(column) => <TableCell>{renderCell(item, column)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

function ChatsTab({ task }: TaskReadProp) {
  const [chats, setChats] = useState<ChatReadAdmin[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const columns = [
    { name: "componentId", label: "Component ID" },
    { name: "chatId", label: "Chat ID" },
    // { name: "participants", label: "Chat Participants" },
    { name: "messages", label: "Messages" },
  ]

  async function getTaskChats() {
    setLoading(true)
    setChats(await api.getTaskChats(task.id))
    setLoading(false)
  }

  useEffect(() => {
    (async () => {
      await getTaskChats()
    })()
  }, [])

  if (loading) {
    return <CenteredSpinner />
  }

  if (chats === undefined) {
    return <Centered>
      Cannot fetch chats
    </Centered>
  }


  function renderCell(chat: ChatReadAdmin, column: Key) {
    switch (column) {
      case "chatId":
        return <Code>{chat.id}</Code>
      case "componentId":
        return <Code>{chat.component_id}</Code>
      case "messages":
        return (
          <div>
            {chat.messages.map(message =>
              <div key={message.id}>
                <span>{message.timestamp.toISOString()} </span>
                <span className="font-bold">{"Participant x:"} </span>
                <span>{message.message}</span>
              </div>
            )}
          </div>
        )
      default:
        return ""
    }
  }

  return (
    <div>
      <Table
        isHeaderSticky
        classNames={{ base: "h-[calc(100vh-6rem)] pt-4" }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.name} align={"start"}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No chats"} items={chats}>
          {(item) => (
            <TableRow key={item.id}>
              {(column) => <TableCell>{renderCell(item, column)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )


}

export default function AdminTaskPage({ params }: TaskParams) {
  const [task, setTask] = useState<TaskRead | undefined>(undefined)
  const [taskLoading, setTaskLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setTaskLoading(true)
      const taskId = (await params).id
      try {
        setTask((await api.getTask(taskId)).data)
      } catch { }
      setTaskLoading(false)
    })()
  }, [])

  if (taskLoading) {
    return <CenteredSpinner />
  }

  if (!task) {
    return (
      <Centered>
        Task not found
      </Centered>
    )
  }

  return (
    <div className="h-full">
      <Tabs variant="underlined">
        <Tab title="Config" className="">
          <ConfigTab task={task} />
        </Tab>
        <Tab title="Responses">
          <ResponsesTab task={task} />
        </Tab>
        <Tab title="Participants">
          <ParticipantsTab task={task} />
        </Tab>
        <Tab title="Chats">
          <ChatsTab task={task} />
        </Tab>
      </Tabs>
    </div>
  )
}