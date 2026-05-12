import { useEffect, useState, useRef, } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

import api from '../services/api'

export default function ContactPage() {

  const [form, setForm] =
    useState({
      name: '',
      email: '',
      subject: '',
      message: '',
    })

  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [captchaToken, setCaptchaToken] = useState('')

  const recaptchaRef = useRef(null)

  useEffect(() => {

    if (success) {
        const timer = setTimeout(() => {
            setSuccess(false)
        }, 4000)
        return () => clearTimeout(timer)
    }

  }, [success])

  async function handleSubmit(e) {

    e.preventDefault()

    setErrors({})

    try {

        const validationErrors = {}

        if (!form.name.trim()) {
            validationErrors.name = 'Name is required.'
        }

        if (!form.email.trim()) {
            validationErrors.email = 'Email is required.'
        }

        if (!/\S+@\S+\.\S+/.test(form.email)) {
            validationErrors.email = 'Invalid email address.'
        }

        if (!form.subject.trim()) {
            validationErrors.subject = 'Subject is required.'
        }

        if (form.message.length < 10) {
            validationErrors.message = 'Message must be at least 10 characters.'
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        if (!captchaToken) {

          setErrors({
            captcha: 'Please verify that you are not a robot.',
          })

          return
        }

        await api.post( '/contacts', {
          ...form, 
          recaptchaToken: captchaToken, 
        })

        setSuccess(true)

        setForm({
            name: '',
            email: '',
            subject: '',
            message: '',
        })

        setCaptchaToken('')

        recaptchaRef.current?.reset()

    } catch (error) {

        if (error.response?.data?.violations ) {

            const apiErrors = {}

            error.response.data.violations
                .forEach((violation) => {

                    apiErrors[
                        violation.propertyPath
                    ] = violation.message
                })

                setErrors(apiErrors)
        }

        if (
            error.response?.data?.message
        ) {

          setErrors({
            captcha:
              error.response.data.message,
          })
        }


    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">

      <div className="rounded-3xl bg-slate-900 p-10 shadow-2xl">

        <h1 className="mb-8 text-4xl font-bold">
          Contact Us
        </h1>

        {
          success && (
            <div className="mb-6 rounded-xl bg-emerald-500/20 px-4 py-3 text-emerald-300 transition-all duration-500">
              Message sent successfully.
            </div>
          )
        }

        <form onSubmit={handleSubmit} className="space-y-6" >

          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 px-4 py-4"
          />
          {
            errors.name && (
                <p className="mt-2 text-sm text-red-400">
                    {errors.name}
                </p>
            )
          }   

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 px-4 py-4"
          />
          {
            errors.email && (
                <p className="mt-2 text-sm text-red-400">
                    {errors.email}
                </p>
            )
          }
 
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm({
                ...form,
                subject: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 px-4 py-4"
          />

          {
            errors.subject && (
                <p className="mt-2 text-sm text-red-400">
                    {errors.subject}
                </p>
            )
          }

          <textarea
            rows="6"
            placeholder="Message"
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message: e.target.value,
              })
            }
            className="w-full rounded-xl bg-slate-800 px-4 py-4"
          />

          {
            errors.message && (
                <p className="mt-2 text-sm text-red-400">
                        {errors.message}
                </p>
            )
          }

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={
              import.meta.env
                .VITE_RECAPTCHA_SITE_KEY
            }
            onChange={(token) =>
              setCaptchaToken(token)
            }
          />

          {
            errors.captcha && (
              <p className="mt-2 text-sm text-red-400">
                {errors.captcha}
              </p>
            )
          }

          <button className="w-full rounded-xl bg-indigo-600 py-4 font-semibold" >
            Send Message
          </button>

        </form>

      </div>

    </div>
  )
}