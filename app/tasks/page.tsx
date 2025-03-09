"use client";

import { MyTasks, TaskRead } from "@/api";
import api from "@/lib/apis";
import { AuthGuard } from "@/components/auth";
import Markdown from "@/components/markdown";
import { wait } from "@/components/utils";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Divider, Skeleton } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface TaskCardProps {
  task?: TaskRead
}

function TaskCard({ task }: TaskCardProps) {

  const taskLoaded = task !== undefined

  const router = useRouter()
  return (
    <Card
      className="w-full"
      isPressable={taskLoaded}
      onPress={() => taskLoaded && router.push(`/tasks/${task.id}`)}
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
      <Divider />

      <CardBody>
        {task && task.config.description ? <Markdown content={task.config.description} /> :
          <div className="flex flex-col gap-4">
            <Skeleton className="h-4 rounded-lg" />
            <Skeleton className="h-4 rounded-lg" />
            <Skeleton className="h-4 rounded-lg" />
          </div>
        }
      </CardBody>
      <Divider />
      <CardFooter>
        <Skeleton className="rounded-lg" isLoaded={taskLoaded}>
          Created {task ? "2024-01-01" : "2024-01-01"}
        </Skeleton>
      </CardFooter>
    </Card>
  )
}

interface TaskGridProps {
  tasks?: (TaskRead | undefined)[]
}

function TaskGrid({ tasks }: TaskGridProps) {
  if (tasks === undefined) {
    tasks = [undefined, undefined, undefined, undefined]
  }
  if (tasks.length === 0) {
    return <div>No tasks found</div>
  }
  return (
    <div className="w-full gap-4 grid grid-cols-4">
      {tasks.map((task, index) => <TaskCard key={index} task={task} />)}
    </div>
  )
}

function TasksPage() {
  const [tasks, setTasks] = useState<MyTasks | undefined>(undefined)
  useEffect(() => {
    (async () => {
      setTasks(undefined)
      try {
        const newTasks = await api.getMyTasks()
        setTasks(newTasks)
      } catch (e) {
        console.log("get tasks error", e)
      }
    })()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-8 m-4">
      <h1 className="text-4xl font-bold">
        Participating
      </h1>
      <TaskGrid tasks={tasks ? tasks.created : undefined} />
      <h1 className="text-4xl font-bold">
        Created
      </h1>
      <TaskGrid tasks={tasks ? tasks.created : undefined} />
    </div>
  )
}

export default function AuthedTasksPage() {
  return <AuthGuard>
    <TasksPage />
  </AuthGuard>
}