import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../services/api'

export default function RegisterPage() {

  const navigate = useNavigate()

  const [form, setForm] =
    useState({
      email: '',
      password: '',
    })

  const [error, setError] = useState('')

  async function handleSubmit(e) {

    e.preventDefault()

    try {

      await api.post('/register', form)

      // Auto login

      const response = await api.post('/auth', form)

      // Store JWT

      localStorage.setItem(
        'token',
        response.data.token
      )

      localStorage.setItem(
        'refresh_token',
        response.data.refresh_token
      )

      navigate('/contacts')

    } catch {

      setError(
        'Registration failed.'
      )
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-slate-900 p-8 shadow-2xl"
      >

        <h1 className="mb-8 text-4xl font-bold text-white">
          Create Account
        </h1>

        {
          error && (
            <div className="mb-6 rounded-xl bg-red-500/20 px-4 py-3 text-red-300">
              {error}
            </div>
          )
        }

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl bg-slate-800 px-4 py-4 text-white"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-6 w-full rounded-xl bg-slate-800 px-4 py-4 text-white"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          className="w-full rounded-xl bg-indigo-600 py-4 font-semibold text-white"
        >
          Register
        </button>

      </form>

    </div>
  )
}