import { useEffect, useState } from 'react'

function Feed() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('all')
  const [tag, setTag] = useState('')

  const load = async () => {
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const params = new URLSearchParams()
    if (filter !== 'all') params.set('type', filter)
    if (tag) params.set('tag', tag)
    const res = await fetch(`${baseUrl}/api/posts?${params.toString()}`)
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => { load() }, [])

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <select value={filter} onChange={e=>setFilter(e.target.value)} className="bg-slate-900 text-white rounded px-3 py-2 border border-slate-700">
          <option value="all">All</option>
          <option value="question">Questions</option>
          <option value="internship_request">Internship Requests</option>
          <option value="discussion">Discussions</option>
        </select>
        <input value={tag} onChange={e=>setTag(e.target.value)} placeholder="Filter by tag" className="bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
        <button onClick={load} className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded">Apply</button>
      </div>

      <ul className="space-y-3">
        {posts.map(p => (
          <li key={p.id} className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
            <div className="text-xs text-blue-300/70 mb-1 uppercase tracking-wide">{p.type.replace('_', ' ')}</div>
            <h3 className="text-white font-semibold">{p.title}</h3>
            <p className="text-blue-200/90 text-sm mt-1">{p.content}</p>
            {p.tags?.length ? (
              <div className="mt-2 flex flex-wrap gap-1">
                {p.tags.map(t => (
                  <span key={t} className="text-xs bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded-full">#{t}</span>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <div className="text-center text-blue-300/70 py-8">No posts yet. Be the first to share!</div>
      )}
    </div>
  )
}

export default Feed
