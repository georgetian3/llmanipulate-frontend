import { ChatsApi, createConfiguration, ServerConfiguration, TasksApi, UsersApi } from "@/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000"

export const chatsApi = new ChatsApi(
  createConfiguration({
    baseServer: new ServerConfiguration(API_URL, {}),
  }),
)

export const tasksApi = new TasksApi(
  createConfiguration({
    baseServer: new ServerConfiguration(API_URL, {}),
  }),
)

export const usersApi = new UsersApi(
  createConfiguration({
    baseServer: new ServerConfiguration(API_URL, {}),
  }),
)