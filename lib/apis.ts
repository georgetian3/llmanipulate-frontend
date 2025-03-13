import { createTaskResponse, getChat, getMe, getMyTasks, getTask, getTasks, loginRequired } from "@/api";
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

  async getMyTasks() {
    await wait(1000)
    const resp = await getMyTasks({ client: client })
    return resp.data
  },

  async getTask(taskId: string) {
    const resp = await getTask({ client: client, path: { task_id: taskId } })
    return resp.data
  },
  async getTasks() {
    return (await getTasks({ client: client })).data
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
  }

}

export default api