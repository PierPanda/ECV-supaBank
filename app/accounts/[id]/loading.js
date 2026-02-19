export default function Loading() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <nav className="mb-6">
          <div className="h-5 w-48 bg-slate-200 rounded animate-pulse" />
        </nav>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-24 bg-white/20 rounded mb-2 animate-pulse" />
                <div className="h-7 w-40 bg-white/30 rounded animate-pulse" />
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="flex items-center justify-between py-3">
              <div className="h-5 w-24 bg-slate-200 rounded animate-pulse" />
              <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="px-8 py-8">
            <div className="h-4 w-20 bg-slate-200 rounded mb-2 animate-pulse" />
            <div className="h-10 w-40 bg-slate-300 rounded animate-pulse" />
          </div>
        </div>

        <div className="mt-8">
          <div className="h-7 w-40 bg-slate-200 rounded mb-4 animate-pulse" />
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="px-6 py-4 flex items-center justify-between border-b border-slate-100 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse" />
                  <div>
                    <div className="h-5 w-24 bg-slate-200 rounded mb-1 animate-pulse" />
                    <div className="h-3 w-32 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-5 w-20 bg-slate-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
