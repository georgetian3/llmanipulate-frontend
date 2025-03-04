"use client";

import { MyTasks, TaskRead } from "@/api";
import { usersApi } from "@/components/apis";
import { AuthGuard } from "@/components/auth";
import Markdown from "@/components/markdown";
import { Avatar, Card, CardBody, CardFooter, CardHeader, Divider, Skeleton } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// import { Suspense, useEffect, useState, useCallback } from "react";
// import TaskCard from "../../components/TaskCard";
// import "../../styles/tasks_page.css";
// import tasks_list from "../../data/tasks.json";
// import { apiRequest } from "../utils";
// import { useStateContext } from "../context/StateContext";
// import { useRouter } from "next/navigation";

// type Task = {
//   task_id: number;
//   query: {
//     title: {
//       en: string;
//       zh: string;
//     };
//     desc: {
//       en: string;
//       zh: string;
//     };
//   };
//   options: {
//     option_id: string;
//     desc: {
//       en: string;
//       zh: string;
//     };
//     info: {};
//   }[];
//   hidden_incentive: string;
// };

// function TasksPage() {
//   const { state, setState } = useStateContext(); // Use setState for global updates
//   const { userId, name, taskType } = state;
//   const router = useRouter();
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [completedTasks, setCompletedTasks] = useState<number[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Restore global state from localStorage on component mount
//   useEffect(() => {
//     const savedState = localStorage.getItem("state");
//     if (savedState) {
//       setState((prev) => ({ ...prev, ...JSON.parse(savedState) }));
//     }
//   }, [setState]);

//   // Persist global state to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("state", JSON.stringify(state));
//   }, [state]);

//   // Fetch tasks and completed tasks
//   useEffect(() => {
//     if (taskType && tasks_list[taskType as keyof typeof tasks_list]) {
//       setTasks(tasks_list[taskType as keyof typeof tasks_list] || []);
//     } else {
//       setTasks([]);
//     }
//   }, [taskType]);

//   const fetchCompletedTasks = useCallback(async () => {
//     try {
//       const response = await apiRequest(`/responses_by_user?user_id=${userId}`, "GET");
//       const data = await response.json();
//       if (Array.isArray(data)) {
//         setCompletedTasks(data.map((item) => Number(item.task_name)));
//       }
//     } catch (error) {
//       console.error("Error fetching completed tasks:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]); // Memoriza a função com base em `userId`

//   useEffect(() => {
//     if (userId) {
//       fetchCompletedTasks();
//     }
//   }, [taskType, userId, fetchCompletedTasks]);

//   // Navigate to the final page when all tasks are completed
//   useEffect(() => {
//     const requiredTaskIds = [1, 2, 3]; // Required task IDs

//     const allRequiredTasksCompleted = requiredTaskIds.every((taskId) =>
//       completedTasks.includes(taskId)
//     );

//     if (allRequiredTasksCompleted) {
//       router.push("/final");
//     }
//   }, [completedTasks, router]);

//   if (loading) {
//     return <div>Loading tasks...</div>;
//   }

//   return (
//     <div className="tasks-container">
//       <h1 className="font-bold text-left">Welcome, {name}</h1>
//       <h2>Please select one of the following scenarios:</h2>
//       <div className="task-cards">
//         {tasks.map((task, index) => (
//           <TaskCard
//             key={index}
//             task={task}
//             taskType={taskType}
//             userId={userId}
//             name={name}
//             isCompleted={completedTasks.includes(task.task_id)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

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
  return (
    <div className="w-full gap-4 grid grid-cols-4">
      {tasks.map((task, index) => <TaskCard key={index} task={task} />)}
    </div>
  )
}

function TasksPage() {
  const [tasks, setTasks] = useState<MyTasks | null>(null)
  useEffect(() => {
    (async () => {
      setTasks(null)
      await new Promise(r => setTimeout(r, 1000))
      try {
        const newTasks = await usersApi.getMyTasks()
        setTasks(newTasks)
      } catch {
        console.log("get tasks error")
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