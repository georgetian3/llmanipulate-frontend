"use client";

import { TaskReadParticipant } from "@/api";
import api from "@/lib/apis";
import { AuthGuard } from "@/components/auth";
import Markdown from "@/components/markdown";
import { Avatar, Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/lib/appSlice";
import AdminTasksPage from "./admin";

interface TaskCardProps {
  task?: TaskReadParticipant
}

function TaskCard({ task }: TaskCardProps) {
  const taskLoaded = task !== undefined
  const router = useRouter()

  if (!taskLoaded) {
    return (
      <Card className="w-full" >
        <CardHeader className="gap-4">
          <Skeleton className="flex rounded-full" isLoaded={taskLoaded}>
            <Avatar />
          </Skeleton>
          <Skeleton className="rounded-lg" isLoaded={taskLoaded}>
            <h1 className="text-2xl">
              Empty task name
            </h1>
          </Skeleton>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 rounded-lg" />
            <Skeleton className="h-4 rounded-lg" />
            <Skeleton className="h-4 rounded-lg" />
          </div>
          <Skeleton>
            <Button className="w-min" color="primary" variant="flat">
              Enter
            </Button>
          </Skeleton>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card
      className="w-full"
    >
      <CardHeader className="gap-4">
        <Skeleton className="flex rounded-full" isLoaded={taskLoaded}>
          <Avatar src="https://i.pravatar.cc/300" />
        </Skeleton>
        <Skeleton className="rounded-lg" isLoaded={taskLoaded}>
          <h1 className="text-2xl">
            {task ? <Markdown content={task.config.name}></Markdown> : "Empty task name"}
          </h1>
        </Skeleton>
      </CardHeader>
      <CardBody className="flex flex-col gap-4 items-center">
        {task.config.description && <Markdown content={task.config.description} />}
        <Button
          isDisabled={task.completed}
          className="w-min"
          color="primary"
          variant="bordered"
          onPress={() => router.push(`/tasks/${task.id}`)}
        >
          {task.completed ? "Completed" : "Enter"}
        </Button>
      </CardBody>
    </Card>
  )
}

interface TaskGridProps {
  tasks?: (TaskReadParticipant | undefined)[]
}

function TaskGrid({ tasks }: TaskGridProps) {
  if (tasks === undefined) {
    tasks = [undefined, undefined, undefined, undefined]
  }
  if (tasks.length === 0) {
    return <div>No tasks found</div>
  }


  return (
    <div className={`flex w-full gap-4 items-center justify-center`}>
      {tasks.map((task, index) => <TaskCard key={index} task={task} />)}
    </div>
  )
}

function TasksPage() {
  const [tasks, setTasks] = useState<TaskReadParticipant[] | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    (async () => {
      setLoading(true)
      setTasks(undefined)
      try {
        const newTasks = await api.getMyTasks()
        setTasks(newTasks ?? [])
      } catch (e) {
        console.log("get tasks error", e)
      }
      setLoading(false)
    })()
  }, [])


  return (
    <div className="flex flex-col h-full items-center justify-center gap-8 m-4">
      {
        loading
          ? <Spinner size="lg" />
          : (tasks === undefined)
            ? <p>Error loading tasks, please refresh</p>
            : <TaskGrid tasks={tasks} />
      }
    </div>
  )
}


export default function AuthedTasksPage() {
  const currentUser = useAppSelector(selectCurrentUser)
  if (currentUser && currentUser.is_admin) {
    return <AuthGuard admin>
      <AdminTasksPage />
    </AuthGuard>
  }
  return <AuthGuard>
    <TasksPage />
  </AuthGuard>
}