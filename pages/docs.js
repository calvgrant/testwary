export default function Docs() {
  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Dokumentasi API</h1>
      <ul className="space-y-4 text-lg">
        <li><code className="text-blue-400">GET /api/quoteid</code> - Quote random</li>
        <li><code className="text-blue-400">GET /api/gombal</code> - Gombalan random</li>
        <li><code className="text-blue-400">GET /api/papkitsu</code> - Gambar papkitsu</li>
        <li><code className="text-blue-400">GET /api/jokereceh</code> - Joke receh random</li>
        <li><code className="text-blue-400">GET /api/jokereceh/all</code> - Semua joke receh</li>
      </ul>
    </main>
  )
}
