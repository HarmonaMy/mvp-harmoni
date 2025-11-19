'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Erro no Aplicativo</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {error.message || 'Ocorreu um erro inesperado'}
        </p>
        <button
          onClick={reset}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  )
}
