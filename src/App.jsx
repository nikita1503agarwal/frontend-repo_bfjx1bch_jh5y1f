import Hero from './components/Hero'
import PostComposer from './components/PostComposer'
import Feed from './components/Feed'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.08),transparent_35%)]" />

      <div className="relative max-w-5xl mx-auto px-6 py-12 space-y-10">
        <Hero />

        <div className="grid grid-cols-1 gap-8">
          <PostComposer onPosted={() => window.location.reload()} />
          <Feed />
        </div>

        <footer className="text-center text-blue-300/60 text-sm">Designed for students, professors, and companies to collaborate.</footer>
      </div>
    </div>
  )
}

export default App
