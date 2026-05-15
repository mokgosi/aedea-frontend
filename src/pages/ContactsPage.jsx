import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import api from '../services/api'

export default function ContactsPage() {

  const [contacts, setContacts] =  useState([])
  const [loading, setLoading] =  useState(true)
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 5
  const location = useLocation()
  const [flash, setFlash] = useState(
    location.state?.flashMessage || ''
  )

  const totalPages =
  Math.ceil(
    totalItems / itemsPerPage
  )

  useEffect(() => {

    async function loadContacts() {
      setLoading(true)

      const response = await api.get(`/contacts?page=${page}&order[createdAt]=desc`)

      const data = response.data

      console.log(response.data)

      const contactsData =
        data['hydra:member'] ||
        data.member ||
        []

      setContacts(contactsData)

      setTotalItems(
        data['hydra:totalItems'] ||
        data.totalItems ||
        0
      )

      setLoading(false)
    }

    loadContacts()

    if (flash) {

      const timer = setTimeout(() => {
        setFlash('')
      }, 4000)

      return () => clearTimeout(timer)
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  }, [page, flash])


if (loading) {
  return (
    <div className="p-10 text-center text-slate-400">
      Loading contacts...
    </div>
  )
}

if ( !loading && contacts.length === 0 ) {
  return (
    <>
    
      <div className="p-10 text-center text-slate-400">
        No contacts found.
        <div className="mt-6"> 
          <Link to="/contact"
            className="
              rounded-xl
              bg-indigo-600
              px-6 py-3
              text-sm font-semibold text-white
              shadow-lg
              transition
              hover:bg-indigo-500
              hover:shadow-indigo-500/30
              active:scale-95
            "
          >
            + New Message
          </Link>
        </div>
      </div>
    </>
  )
}

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 text-5xl font-bold">
        Messages
      </h1>

       <div className="flex justify-end mb-6">

       <Link to="/contact"
          className="
            rounded-xl
            bg-indigo-600
            px-6 py-3
            text-sm font-semibold text-white
            shadow-lg
            transition
            hover:bg-indigo-500
            hover:shadow-indigo-500/30
            active:scale-95
          "
        >
          + New Message
        </Link>

      </div>

      {flash && (

        <div
          className="
            mb-6
            rounded-xl
            border border-emerald-500/30
            bg-emerald-500/10
            px-4 py-3
            text-sm font-medium
            text-emerald-300
            shadow-lg
            backdrop-blur
          "
        >
          {flash}
        </div>

      )}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">

        <table className="w-full">

          <thead className="border-b border-white/10 bg-slate-800">

            <tr>

              <th className="px-6 py-5 text-left">
                Name
              </th>

              <th className="px-6 py-5 text-left">
                Subject
              </th>

              <th className="px-6 py-5 text-left">
                Email
              </th>

              <th className="py-3">Created At</th>

              <th className="px-6 py-5 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              contacts.map((contact) => (

                <tr
                  key={contact.id}
                  className="border-b border-white/5"
                >

                  <td className="px-6 py-5">
                    {contact.name}
                  </td>

                  <td className="px-6 py-5">
                    {contact.subject}
                  </td>

                  <td className="px-6 py-5">
                    {contact.email}
                  </td>

                  <td className="py-5 text-sm text-slate-400">
                    {new Date(contact.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-5">

                    <Link
                      to={`/contacts/${contact.id}`}
                      className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold"
                    >
                      View
                    </Link>

                  </td>

                </tr>

              ))
            }

          </tbody>

        </table>

        

      </div>

      <div className="mt-8 flex items-center justify-between">

          <div className="text-sm text-slate-400">
            Showing page {page} of {totalPages}
          </div>

          <div className="flex gap-2">

            {
              [...Array(totalPages)]
                .map((_, index) => {

                  const pageNumber = index + 1

                  return (

                    <button key={pageNumber} onClick={() => setPage(pageNumber)}
                      className={`rounded-xl px-4 py-2 ${page === pageNumber ? 'bg-indigo-600' : 'bg-slate-800'}`}
                    >
                      {pageNumber}
                    </button>
                  )
                })
            }

          </div>

        </div>

    </div>
  )
}