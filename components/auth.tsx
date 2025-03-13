'use client'

import { useEffect, useState } from "react"
import { forbidden, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { selectCurrentUser, selectState, setCurrentUser } from "@/lib/appSlice"
import api from "../lib/apis"

const SET_USER_ID_EVENT = "setUserIdEvent"

export function saveUserId(userId?: string) {
  localStorage.setItem("userId", userId ?? "")
  window.dispatchEvent(new Event(SET_USER_ID_EVENT))
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


interface AuthGuardProps {
  children: React.ReactNode,
  admin?: boolean,
  condition?: Promise<boolean>
}

export function AuthGuard({ children, admin, condition }: AuthGuardProps) {
  const isAuthed = useAuthenticated()
  const router = useRouter()
  const currentUser = useAppSelector(selectCurrentUser)
  const [conditionResult, setConditionResult] = useState<boolean | undefined>(condition ? undefined : true)

  useEffect(() => {
    (async () => {
      setConditionResult(undefined)
      setConditionResult(condition ? await condition: true)
    })()
  }, [isAuthed, router, currentUser])

  if (!isAuthed || conditionResult === undefined) {
    return null
  }

  if (!conditionResult || admin && (!currentUser || !currentUser.is_admin)) {
    forbidden()
  }

  return <>{children}</>
}