'use client'

import { useEffect, useState } from "react"
import { authApi, refreshApis, usersApi } from "./apis"
import { useRouter } from "next/navigation"

const ACCESS_TOKEN_STORAGE_EVENT = "accessTokenStorageEvent"

export function setAccessToken(accessToken?: string) {
  console.log("Setting access token", accessToken)
  if (typeof window === 'undefined') {
    accessToken = ""
  }
  localStorage.setItem("accessToken", accessToken ?? "")
  refreshApis()
  window.dispatchEvent(new Event(ACCESS_TOKEN_STORAGE_EVENT))
}

export function getAccessToken() {
  if (typeof window === 'undefined') {
    return ""
  }
  return localStorage.getItem("accessToken") ?? ""
}

export async function login(username: string, password: string) {
  await new Promise(r => setTimeout(r, 1000))
  try {
    const resp = await authApi.authAuthLogin(username, password)
    setAccessToken(resp.accessToken)
    return true
  } catch {
    return false
  }
}

export async function logout() {
  try {
    await authApi.authAuthLogout()
  } catch { }
  setAccessToken()
}

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  async function handleAccessTokenEvent() {
    if (!getAccessToken()) {
      setIsAuthenticated(false)
      return
    }
    setIsAuthenticated(null)
    try {
      await usersApi.usersCurrentUser()
      setIsAuthenticated(true)
    } catch {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    handleAccessTokenEvent()
    window.addEventListener(ACCESS_TOKEN_STORAGE_EVENT, handleAccessTokenEvent)
    return () => {
      window.removeEventListener(ACCESS_TOKEN_STORAGE_EVENT, handleAccessTokenEvent)
    }
  }, [])

  return isAuthenticated
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthed = useAuthenticated()
  const router = useRouter()

  useEffect(() => {
    if (isAuthed === false) {
      router.push("/login")
    }
  }, [isAuthed, router])

  if (!isAuthed) {
    return null
  }

  return <>{children}</>
}