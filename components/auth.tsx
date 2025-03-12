'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/hooks"
import { setCurrentUser } from "@/lib/appSlice"
import api from "../lib/apis"

const SET_USER_ID_EVENT = "setUserIdEvent"

export function saveUserId(accessToken?: string) {
  localStorage.setItem("userId", accessToken ?? "")
}

export function getUserId() {
  if (typeof window === 'undefined') {
    return ""
  }
  return localStorage.getItem("userId") ?? ""
}

export function useLogin() {
  const dispatch = useAppDispatch()
  const login = async (userId: string) => {
    try {
      console.log("Here")
      const user = await api.getMe(userId)
      if (user) {
        saveUserId(userId)
        dispatch(setCurrentUser(user))
        return true
      }
    } catch (e) {
      console.error(e)
    }
    saveUserId()
    return false
  }
  return login
}

export function useLogout() {
  const dispatch = useAppDispatch()
  const logout = async () => {
    saveUserId()
    dispatch(setCurrentUser())
  }
  return logout
}

export function useAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)

  async function handleSetUserIdEvent() {
    if (!window) {
      return
    }
    setIsAuthenticated(undefined)
    if (!await api.loginRequired()) {
      setIsAuthenticated(true)
      return
    }
    const userId = getUserId()
    if (!userId) {
      setIsAuthenticated(false)
      return
    }
    setIsAuthenticated(undefined)
    try {
      if (await api.getMe(userId)) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
        saveUserId()
      }
    } catch {
      setIsAuthenticated(false)
      saveUserId()
    }
  }

  useEffect(() => {
    handleSetUserIdEvent()
    window.addEventListener(SET_USER_ID_EVENT, handleSetUserIdEvent)
    return () => {
      window.removeEventListener(SET_USER_ID_EVENT, handleSetUserIdEvent)
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