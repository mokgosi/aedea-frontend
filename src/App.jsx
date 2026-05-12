import { Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ContactsPage from './pages/ContactsPage'
import ContactShowPage from './pages/ContactShowPage'
import ContactPage from './pages/ContactPage'
import RegisterPage from './pages/RegisterPage'

import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {

  return (
    <Routes>

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <ContactsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contacts/:id"
          element={
            <ProtectedRoute>
              <ContactShowPage />
            </ProtectedRoute>
          }
        />

      </Route>

    </Routes>
  )
}