// src/pages/NotFound.tsx
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-9xl font-extrabold tracking-widest text-gray-800">404</h1>
      <div className="absolute rotate-12 rounded bg-blue-500 px-2 text-sm text-white shadow-lg">
        Page not found
      </div>

      <p className="mt-6 text-lg text-gray-600">Oups... cette page n’existe pas.</p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 text-white font-semibold shadow-md transition hover:bg-blue-700"
      >
        Retour à l’accueil
      </Link>
    </div>
  )
}
