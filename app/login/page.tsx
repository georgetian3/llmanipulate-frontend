'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Button, Checkbox, Form, Input } from '@heroui/react';
import { useLogin } from '@/components/auth';
import api from '@/lib/apis';

export default function LoginPage() {

  const router = useRouter()
  const [username, setUsername] = useState("sample_user1@example.com")
  const [password, setPassword] = useState("secret")
  const [loginClicked, setLoginClicked] = useState(false)
  const [signUpClicked, setSignUpClicked] = useState(false)
  const [warning, setWarning] = useState("")
  const inputDisabled = loginClicked || signUpClicked
  const login = useLogin()

  async function handleLogin() {
    setWarning("")
    setLoginClicked(true)
    if (await login(username, password)) {
      router.push("/tasks")
    } else {
      setWarning("Invalid credentials")
      setLoginClicked(false)
    }
  }

  async function handleSignUp() {
    setWarning("")
    setSignUpClicked(true)
    try {
      await api.register(username, password)
      await handleLogin()
    } catch {
      setWarning("Email taken")
    }
    setSignUpClicked(false)
  }

  return (
    <div className="flex flex-col gap-16 h-full justify-center align-middle items-center">
      <h1 className='font-bold text-2xl'>LLManipulate</h1>
      <Form className="w-1/4 gap-8">
        <Input isDisabled={inputDisabled} label="Email" type="email" onChange={(event) => setUsername(event.target.value)} value={username} />
        <Input isDisabled={inputDisabled} label="Password" type="password" onChange={(event) => setPassword(event.target.value)} value={password} />
        <Checkbox isDisabled={inputDisabled}>Remember me</Checkbox>
        <div className='w-full flex justify-evenly'>
          <Button
            color="primary" type="submit"
            isDisabled={inputDisabled}
            isLoading={loginClicked}
            className='w-1/3'
            onPress={handleLogin}
          >
            Login
          </Button>
          <Button
            isDisabled={inputDisabled}
            isLoading={signUpClicked}
            className='w-1/3'
            onPress={handleSignUp}
          >
            Sign Up
          </Button>
        </div>
        {warning && <div className='w-full text-center text-danger'>{warning}</div>}
      </Form>
    </div>
  )
}