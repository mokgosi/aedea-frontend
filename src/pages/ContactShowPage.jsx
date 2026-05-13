import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import api from '../services/api'

export default function ContactShowPage() {

  const { id } = useParams()

  const [contact, setContact] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {

    async function loadContact() {

      const response =
        await api.get(`/contacts/${id}`)

      setContact(response.data)
    }

    loadContact()

  }, [id])

  if (!contact) {

    return (
      <div className="p-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">

      <div className="rounded-3xl bg-slate-900 p-10 shadow-2xl">

        <h1 className="mb-8 text-2xl font-bold">
          {contact.subject}
        </h1>

        <div className="space-y-6">

          <div>
            <p className="mb-2 text-sm text-slate-400">
              Name
            </p>

            <p className="text-xl">
              {contact.name}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-slate-400">
              Email
            </p>

            <p className="text-xl">
              {contact.email}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm text-slate-400">
              Message
            </p>

            <div className="rounded-2xl bg-slate-800 p-6 leading-8">
              {contact.message}
            </div>
          </div>

        </div>

        <div className="mb-6 mt-6 flex items-center">

            <button
              onClick={() => navigate(-1)}
              className="
                rounded-xl
                border border-slate-700
                bg-slate-900
                px-4 py-2
                text-sm font-medium text-white
                transition
                hover:bg-slate-800
              "
            >
              ← Back
            </button>

          </div>

      </div>

    </div>
  )
}