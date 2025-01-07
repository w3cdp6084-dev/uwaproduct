import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        404
      </h1>
      <Link href="/" className="text-xl text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors">
        TOPに戻る
      </Link>
    </div>
  )
}

