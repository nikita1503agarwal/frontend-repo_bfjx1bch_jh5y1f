import { useState } from 'react'

function PostComposer({ onPosted }) {
  const [type, setType] = useState('question')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('internship,web')
  const [userId, setUserId] = useState('demo-user')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          title,
          content,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          created_by: userId
        })
      })
      if (!res.ok) throw new Error('Failed to post')
      const data = await res.json()
      onPosted && onPosted(data.id)
      setTitle('')
      setContent('')
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <select value={type} onChange={e=>setType(e.target.value)} className="bg-slate-900 text-white rounded px-3 py-2 border border-slate-700">
          <option value="question">Question</option>
          <option value="internship_request">Internship Request</option>
          <option value="discussion">Discussion</option>
        </select>
        <input value={userId} onChange={e=>setUserId(e.target.value)} placeholder="Your User ID" className="bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
        <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="tags (comma-separated)" className="bg-slate-900 text-white rounded px-3 py-2 border border-slate-700 md:col-span-2" />
      </div>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
      <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Share details..." className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700 h-24" />
      <div className="flex justify-end">
        <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded">{loading? 'Posting...' : 'Post'}</button>
      </div>
    </form>
  )
}

export default PostComposer
