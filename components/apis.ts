import { AuthApi, ChatsApi, createConfiguration, ServerConfiguration, TasksApi, UsersApi } from "@/api";
import { getAccessToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"

export var chatsApi: ChatsApi
export var tasksApi: TasksApi
export var usersApi: UsersApi
export var authApi: AuthApi

export function refreshApis() {
  const configurationParmeters = createConfiguration({
    baseServer: new ServerConfiguration(API_URL, {}),
    authMethods: { OAuth2PasswordBearer: { accessToken: getAccessToken() } }
  })
  chatsApi = new ChatsApi(configurationParmeters)
  tasksApi = new TasksApi(configurationParmeters)
  usersApi = new UsersApi(configurationParmeters)
  authApi = new AuthApi(configurationParmeters)
}

refreshApis()