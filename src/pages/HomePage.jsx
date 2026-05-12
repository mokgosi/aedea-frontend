import { Link } from 'react-router-dom'

export default function HomePage() {

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-6">

      <div className="mx-auto max-w-5xl text-center">

        <h1 className="text-6xl font-extrabold leading-tight">

          Share Your Ideas.
          <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Build Something Amazing.
          </span>

        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-400">
          Send us your ideas, project proposals,
          collaborations, or business inquiries.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            to="/register"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold"
          >
            Create Account
          </Link>

          {/* <Link
            to="/login"
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-semibold"
          >
            Admin Login
          </Link> */}

        </div>

      </div>

    </div>
  )
}