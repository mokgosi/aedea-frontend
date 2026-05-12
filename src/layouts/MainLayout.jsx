import { isLoggedIn, logout } from '../utils/auth'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function MainLayout() {

  const navigate = useNavigate()

  const loggedIn = isLoggedIn()

  function logout() {

    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    navigate('/login')

  }

  const token =
    localStorage.getItem('token')

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
          >
            IdeaHub
          </Link>

          <nav className="flex items-center gap-4">

            {!loggedIn && (
              <>
                <Link to="/" className="text-slate-300 transition hover:text-white" >
                  Home
                </Link>

                <Link to="/login" className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold" >
                  Login
                </Link>

               
              </>
            )}

            {loggedIn && (
              <>
                <Link to="/contacts" className="text-slate-300 transition hover:text-white" >
                  Contacts
                </Link>

                <button onClick={logout} className="rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold">
                  Logout
                </button>
              </>
            )}

            {/* <Link to="/" className="text-slate-300 transition hover:text-white" >
              Home
            </Link>

            <Link to="/contacts" className="text-slate-300 transition hover:text-white" >
              Contacts
            </Link> */}

            {/* {
              token ? (
                <button onClick={logout} className="rounded-xl bg-red-500 px-5 py-2 text-sm font-semibold">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold" >
                  Login
                </Link>


                
              )
            } */}



          </nav>

        </div>

      </header>

      <main>
        <Outlet />
      </main>

    </div>
  )
}