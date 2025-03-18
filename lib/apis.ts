import { createTask, createTaskParticipant, createTaskResponse, deleteTask, getChat, getMe, getMyTasks, getTask, getTaskParticipants, getTaskResponses, getTasks, loginRequired, TaskCreate } from "@/api";
import { createClient } from "@hey-api/client-fetch";
import { ComponentResponsesType } from "./appSlice";
import { wait } from "@/components/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"

const client = createClient({ baseUrl: API_URL })


const api = {

  async getMe(userId: string) {
    client.setConfig({ baseUrl: API_URL, auth: userId })
    const resp = await getMe({ client: client })
    return resp.data
  },
  async loginRequired() {
    const resp = await loginRequired({ client: client })
    return resp.data!.login_required
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
    const resp = await getTask({ client: client, path: { task_id: taskId } })
    return resp.data
  },
  async getTasks() {
    return (await getTasks({ client: client })).data
  },
  async deleteTask(taskId: string) {
    return (await deleteTask({ client: client, path: { task_id: taskId } }))
  },
  async getChatHistory(chatId: string) {
    const resp = await getChat({ client: client, path: { chat_id: chatId } })
    return resp.data
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
  async createTaskParticipant(taskId: string, participantId: string | undefined) {
    return (await createTaskParticipant({ client: client, path: { task_id: taskId }, body: { user: participantId ?? null } })).data
  },

}

export default api