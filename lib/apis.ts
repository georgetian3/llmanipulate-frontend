import { createTask, createTaskResponse, deleteTask, getMe, getMyTasks, getTask, getTaskChats, getTaskParticipants, getTaskResponses, getTasks, TaskCreate } from "@/api";
import { Client, createClient } from "@hey-api/client-fetch";
import { ComponentResponsesType } from "./appSlice";



class Api {

  client: Client;

  constructor() {
    this.client = createClient({ baseUrl: process.env.NEXT_PUBLIC_API_URL })
  }
  setUserId(userId?: string) {
    this.client.setConfig({ baseUrl: process.env.NEXT_PUBLIC_API_URL, auth: userId })
  }
  async getMe() {
    const resp = await getMe({ client: this.client })
    return resp.data
  }
  async createTask(task: TaskCreate) {
    return await createTask({ client: this.client, body: task })
  }
  async getMyTasks() {
    const resp = await getMyTasks({ client: this.client })
    return resp
  }
  async getTask(taskId: string) {
    return await getTask({ client: this.client, path: { task_id: taskId } })
  }
  async getTasks() {
    return (await getTasks({ client: this.client })).data
  }
  async deleteTask(taskId: string) {
    return (await deleteTask({ client: this.client, path: { task_id: taskId } }))
  }
  async submitResponse(taskId: string, responses: ComponentResponsesType) {
    try {
      const resp = await createTaskResponse({ client: this.client, path: { task_id: taskId }, body: { response: responses } })
      return resp.data
    } catch (e) {
      console.error("Error encountered while submitting response:", e)
      return undefined
    }
  }
  async getTaskResponses(taskId: string) {
    return (await getTaskResponses({ client: this.client, path: { task_id: taskId } })).data
  }
  async getTaskParticipants(taskId: string) {
    return (await getTaskParticipants({ client: this.client, path: { task_id: taskId } })).data
  }
  async getTaskChats(taskId: string) {
    return (await getTaskChats({ client: this.client, path: { task_id: taskId } })).data
  }

}

const api = new Api()

export default api