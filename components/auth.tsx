'use client'

import { useEffect, useState } from "react"
import { authApi, refreshApis, usersApi } from "./apis"
import { Spinner } from "@heroui/react"
import { useRouter } from "next/navigation"

const ACCESS_TOKEN_KEY = "accessToken"

export function setAccessToken(accessToken?: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken ?? "")
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY) ?? ""
}

export async function logout() {
  try {
    await authApi.authAuthLogout()
  } catch { }
  setAccessToken()
  refreshApis()
}

export async function isAuthenticated() {
  if (!getAccessToken()) {
    return false
  }
  try {
    await usersApi.usersCurrentUser()
    return true
  } catch {
    return false
  }
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      setLoading(true)
      const newAuthed = await isAuthenticated()
      setAuthed(newAuthed)
      !newAuthed && router.push("/login")
      setLoading(false)
    })()
  }, [authed])

  if (loading) {
    return <Spinner />
  }

  if (!authed) {
    return null
  }
  console.log("returning children")

  return <>{children}</>
}