'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { Button, Checkbox, Form, Input } from '@heroui/react';
import { useLogin } from '@/components/auth';

export default function LoginPage() {

  const router = useRouter()
  const [userId, setUserId] = useState("73cf13cc-09a2-4f11-8d9b-50e34a7bbce0")
  const [loginClicked, setLoginClicked] = useState(false)
  const [warning, setWarning] = useState("")

  const login = useLogin()

  async function handleLogin() {
    setWarning("")
    setLoginClicked(true)
    if (await login(userId)) {
      router.push("/tasks")
    } else {
      setWarning("Invalid credentials")
      setLoginClicked(false)
    }
  }

  return (
    <div className="flex flex-col gap-16 h-full justify-center align-middle items-center">
      <h1 className='font-bold text-2xl'>LLManipulate</h1>
      <Form className="w-1/4 gap-8">
        <Input isDisabled={loginClicked} label="User ID" type="text" onChange={(event) => setUserId(event.target.value)} value={userId} />
        <div className='w-full flex justify-evenly'>
          <Button
            color="primary" type="submit"
            isDisabled={loginClicked}
            isLoading={loginClicked}
            className='w-1/3'
            onPress={handleLogin}
          >
            Continue
          </Button>
        </div>
        {warning && <div className='w-full text-center text-danger'>{warning}</div>}
      </Form>
    </div>
  )
}