"use client";

import Button from "@/components/Button"
import { Input } from "@/components/Input"
import axios from 'axios'
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const router = useRouter()

  const handleLogin = async () => {
    try {
      await axios.post('/api/login', { user, password })
      router.replace('/dashboard')
    } catch {
      setError(true)
    }
  }

  return (
    <section className="m-auto max-w-5xl mt-5">
      <fieldset>
        {error && (
          <div className="bg-red-500 text-white p-3 m-2 rounded-lg shadow-lg text-lg">Wrong username or password</div>
        )}
        <div>
          <label>Username:</label><br />
          <Input name="user" type="text" onChange={event => setUser(event.target.value)} />
        </div>
        <div className="mt-2">
          <label>Password: </label><br />
          <Input name="password" type="password" onChange={event => setPassword(event.target.value)} />
        </div>
        <div className="mt-5">
          <Button type="submit" onClick={handleLogin}>Login</Button>
        </div>
      </fieldset>
    </section>
  )
}

export default Login