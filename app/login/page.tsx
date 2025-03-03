'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks'
import { apiRequest, setUser } from '@/lib/testSlice'
import { authApi, refreshApis } from '@/components/apis';
import { Button, Checkbox, Form, Input } from '@heroui/react';
import { setAccessToken } from '@/components/auth';


const user_id_key = 'user_id'

function saveUserPassword(password: string) {
  localStorage.setItem(user_id_key, password)
}

function getUserPassword() {
  return localStorage.getItem(user_id_key)
}

function clearUserPassword() {
  localStorage.removeItem(user_id_key)
}

function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  const [warning, setWarning] = useState('')
  const [loading, setLoading] = useState(false)
  const [save, setSave] = useState(false)

  useEffect(() => {
    setPassword(getUserPassword() ?? '')
    handleLogin()
  }, [])

  async function handleLogin() {
    if (!save) {
      clearUserPassword()
    }
    if (!password) {
      setWarning('Please enter a password')
      return
    }
    setLoading(true)
    const resp = await apiRequest(`/users/${password}`, 'GET')
    switch (resp.status) {
      case 200: {
        setWarning('')
        if (save) {
          saveUserPassword(password)
        }
        const user = await resp.text() //console.log(await resp.text())
        dispatch(setUser(user))
        router.push('/tasks')
        break
      }
      case 404: {
        setWarning('Invalid password')
        break
      }
      default: {
        setWarning('An unexpected error occurred. Please try again.')
        console.error(`Unexpected response: status ${resp.status} text ${await resp.text()}`)
      }
    }
    setLoading(false)
  }



  // setLoading(true);
  // try {
  //   const userData = await fetchUserData(usercode.trim());
  //   if (!userData) {
  //     alert('No matching User found. Please try again.');
  //     return;
  //   }

  //   const state = {
  //     taskType: userData.task_type,
  //     taskId: '',
  //     userId: usercode.trim(),
  //     name: userData.demographics.name,
  //     initialScores: { A: 1, B: 1, C: 1, D: 1, confidence: 1, familiarity: 1 },
  //     options: [],
  //   };

  //   if (localStorage.getItem('state'))
  //     localStorage.removeItem('state');
  //   // setState(state);


  //   router.push(`/tasks?`);
  // } catch (error) {
  //   console.error('Error during login:', error);
  //   alert('An unexpected error occurred. Please try again.');
  // } finally {
  //   setLoading(false);
  // }



  return <div
    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-xl p-10 flex flex-col items-center w-[60%] space-y-6'
  >
    <h1 className='text-[#6e7174] text-lg'>Please enter your passcode below</h1>
    <input
      type='text'
      onChange={(e) => setPassword(e.target.value)}
      className='w-full rounded-lg h-12 bg-[#F3F5F7] text-center'
    />
    <div className='space-x-2'>
      <input type='checkbox' checked={save} onChange={() => setSave(!save)}></input>
      <label>
        Remember me
      </label>
    </div>
    <button
      onClick={handleLogin}
      className={`${loading ? 'bg-gray-500' : 'bg-[#6558d3]'} text-white font-bold w-fit rounded-lg p-2`}
      disabled={loading}
    >
      Login
    </button>
    {warning && <div className='text-red-500'>
      {warning}
    </div>}
  </div>
}



export default function NewLoginPage() {

  const router = useRouter()

  const [username, setUsername] = useState("sample_participant@example.com")
  const [password, setPassword] = useState("secret")
  const [loginClicked, setLoginClicked] = useState(false)
  const [signUpClicked, setSignUpClicked] = useState(false)
  const [warning, setWarning] = useState("")

  async function handleLogin() {
    setWarning("")
    setLoginClicked(true)
    await new Promise(r => setTimeout(r, 1000))
    try {
      const resp = await authApi.authAuthLogin(username, password)
      setAccessToken(resp.accessToken)
      refreshApis()
      router.push("/tasks")
    } catch {
      setWarning("Invalid credentials")
    }
    setLoginClicked(false)
  }

  async function handleSignUp() {
    setWarning("")
    setSignUpClicked(true)
    await new Promise(r => setTimeout(r, 1000))
    setSignUpClicked(false)
  }


  return <div className="flex flex-col gap-16 h-full justify-center align-middle items-center">
    <h1 className='font-bold text-2xl'>LLManipulate</h1>
    <Form className="w-1/4 gap-8">
      <Input label="Email" type="email" onChange={(event) => setUsername(event.target.value)} value={username} />
      <Input label="Password" type="password" onChange={(event) => setPassword(event.target.value)} value={password} />
      <Checkbox>Remember me</Checkbox>
      <div className='w-full flex justify-evenly'>
        <Button
          color="primary" type="submit"
          isDisabled={loginClicked || signUpClicked}
          isLoading={loginClicked}
          className='w-1/3'
          onPress={handleLogin}
        >
          Login
        </Button>
        <Button
          isDisabled={loginClicked || signUpClicked}
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

}