import { authAuthLogin, authAuthLogout, createTaskResponse, getChat, getMyTasks, getTask, registerRegister, usersCurrentUser } from "@/api";
import { createClient } from "@hey-api/client-fetch";
import { ComponentResponsesType } from "./appSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"

const client = createClient({ baseUrl: API_URL })


const api = {
  async register(username: string, password: string) {
    const resp = await registerRegister({ client: client, body: { email: username, password: password } })
    return resp.data
  },
  async login(username: string, password: string) {
    const resp = await authAuthLogin({ client: client, body: { username: username, password: password } })
    if (resp.data) {
      client.setConfig({ auth: resp.data.access_token })
    }
    return resp.data?.access_token
  },
  async logout() {
    await authAuthLogout({ client: client })
  },
  async getMyTasks() {
    const resp = await getMyTasks({ client: client })
    return resp.data
  },
  async getCurrentUser() {
    const resp = await usersCurrentUser({ client: client })
    return resp.data
  },
  async getTask(taskId: string) {
    const resp = await getTask({ client: client, path: { task_id: taskId } })
    return resp.data
  },
  async getChatHistory(chatId: string) {
    const resp = await getChat({ client: client, path: { chat_id: chatId } })
    return resp.data
  },
  async submitResponse(taskId: string, responses: ComponentResponsesType, draft: boolean) {
    const resp = await createTaskResponse({client: client, path: {task_id: taskId}, body: {draft: draft, response: responses}})
    return resp.data
  }

}

export default api