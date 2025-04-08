import { useState } from 'react'

export default function Tester() {
  const [result, setResult] = useState('')
  const testEndpoint = async (endpoint) => {
    const res = await fetch(endpoint)
    const data = await res.json()
    setResult(JSON.stringify(data, null, 2))
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Tester API</h1>
      <div className="space-y-2 mb-6">
        {['quoteid', 'gombal', 'papkitsu', 'jokereceh', 'jokereceh/all'].map((e) => (
          <button key={e}
            onClick={() => testEndpoint('/api/' + e)}
            className="bg-blue-700 hover:bg-blue-500 px-4 py-2 rounded mr-2"
          >
            Test /api/{e}
          </button>
        ))}
      </div>
      <pre className="bg-gray-900 p-4 rounded text-green-300 overflow-x-auto">{result}</pre>
    </main>
  )
}
