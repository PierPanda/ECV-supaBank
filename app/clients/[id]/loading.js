export default function Loading() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <div className="h-5 w-40 bg-slate-200 rounded animate-pulse" />
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-full animate-pulse" />
              <div>
                <div className="h-4 w-16 bg-white/20 rounded mb-2 animate-pulse" />
                <div className="h-8 w-48 bg-white/30 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="h-7 w-32 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 w-36 bg-slate-200 rounded-xl animate-pulse" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100"
              >
                <div className="h-6 w-40 bg-slate-200 rounded mb-4 animate-pulse" />
                <div className="h-4 w-16 bg-slate-100 rounded mb-2 animate-pulse" />
                <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
