import { createTask, createTaskResponse, deleteTask, getMe, getMyTasks, getTask, getTaskParticipants, getTaskResponses, getTasks, loginRequired, TaskCreate } from "@/api";
import { createClient } from "@hey-api/client-fetch";
import { ComponentResponsesType } from "./appSlice";
import { wait } from "@/components/utils";
import { getUserId } from "@/components/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"

const client = createClient({ baseUrl: API_URL })


const api = {
  setUserId() {
    client.setConfig({ baseUrl: API_URL, auth: getUserId().userId })
  },
  async getMe() {
    this.setUserId()
    const resp = await getMe({ client: client })
    return resp.data
  },
  async loginRequired() {
    this.setUserId()
    const resp = await loginRequired({ client: client })
    return resp.data!.login_required
  },
  async createTask(task: TaskCreate) {
    this.setUserId()
    return await createTask({ client: client, body: task })
  },
  async getMyTasks() {
    this.setUserId()
    await wait(1000)
    const resp = await getMyTasks({ client: client })
    return resp
  },
  async getTask(taskId: string) {
    this.setUserId()
    return await getTask({ client: client, path: { task_id: taskId } })
  },
  async getTasks() {
    this.setUserId()
    return (await getTasks({ client: client })).data
  },
  async deleteTask(taskId: string) {
    this.setUserId()
    return (await deleteTask({ client: client, path: { task_id: taskId } }))
  },
  async submitResponse(taskId: string, responses: ComponentResponsesType) {
    this.setUserId()
    try {
      const resp = await createTaskResponse({ client: client, path: { task_id: taskId }, body: { response: responses } })
      return resp.data
    } catch (e) {
      console.error("Error encountered while submitting response:", e)
      return undefined
    }
  },
  async getTaskResponses(taskId: string) {
    this.setUserId()
    return (await getTaskResponses({ client: client, path: { task_id: taskId } })).data
  },
  async getTaskParticipants(taskId: string) {
    this.setUserId()
    return (await getTaskParticipants({ client: client, path: { task_id: taskId } })).data
  },

}

export default api