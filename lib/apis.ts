import { createTask, createTaskResponse, deleteTask, getMe, getMyTasks, getTask, getTaskChats, getTaskParticipants, getTaskResponses, getTasks, TaskCreate } from "@/api";
import { createClient } from "@hey-api/client-fetch";
import { ComponentResponsesType } from "./appSlice";
import { wait } from "@/components/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"

const client = createClient({ baseUrl: API_URL })

const api = {
  setUserId(userId?: string) {
    client.setConfig({ baseUrl: API_URL, auth: userId })
  },
  async getMe() {
    const resp = await getMe({ client: client })
    return resp.data
  },
  async createTask(task: TaskCreate) {
    return await createTask({ client: client, body: task })
  },
  async getMyTasks() {
    await wait(1000)
    const resp = await getMyTasks({ client: client })
    return resp
  },
  async getTask(taskId: string) {
    return await getTask({ client: client, path: { task_id: taskId } })
  },
  async getTasks() {
    return (await getTasks({ client: client })).data
  },
  async deleteTask(taskId: string) {
    return (await deleteTask({ client: client, path: { task_id: taskId } }))
  },
  async submitResponse(taskId: string, responses: ComponentResponsesType) {
    try {
      const resp = await createTaskResponse({ client: client, path: { task_id: taskId }, body: { response: responses } })
      return resp.data
    } catch (e) {
      console.error("Error encountered while submitting response:", e)
      return undefined
    }
  },
  async getTaskResponses(taskId: string) {
    return (await getTaskResponses({ client: client, path: { task_id: taskId } })).data
  },
  async getTaskParticipants(taskId: string) {
    return (await getTaskParticipants({ client: client, path: { task_id: taskId } })).data
  },
  async getTaskChats(taskId: string) {
    return (await getTaskChats({ client: client, path: { task_id: taskId } })).data
  }

}

export default api