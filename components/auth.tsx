'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { wait } from "./utils"
import { useAppDispatch } from "@/lib/hooks"
import { setCurrentUser } from "@/lib/appSlice"
import api from "../lib/apis"

const ACCESS_TOKEN_STORAGE_EVENT = "accessTokenStorageEvent"

export function setAccessToken(accessToken?: string) {
  localStorage.setItem("accessToken", accessToken ?? "")
  window.dispatchEvent(new Event(ACCESS_TOKEN_STORAGE_EVENT))
}

export function getAccessToken() {
  if (typeof window === 'undefined') {
    return ""
  }
  return localStorage.getItem("accessToken") ?? ""
}

export function useLogin() {
  const dispatch = useAppDispatch()
  const login = async (username: string, password: string) => {
    try {
      const token = await api.login(username, password)
      setAccessToken(token)
      const currentUser = await api.getCurrentUser()
      dispatch(setCurrentUser(currentUser))
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
  return login
}

export function useLogout() {
  const dispatch = useAppDispatch()
  const logout = async () => {
    try {
      await api.logout()
    } catch (e) {
      console.error("Error logging out", e)
    }
    setAccessToken()
    dispatch(setCurrentUser())
  }
  return logout
}

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)

  async function handleAccessTokenEvent() {
    if (!window) {
      return
    }
    if (!getAccessToken()) {
      setIsAuthenticated(false)
      return
    }
    setIsAuthenticated(undefined)
    try {
      if (await api.getCurrentUser()) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        console.log("a")
        setAccessToken()
      }
    } catch {
      setIsAuthenticated(false)
      console.log("b")
      setAccessToken()
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