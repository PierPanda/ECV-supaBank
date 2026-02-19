export default function Loading() {
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <header className="bg-linear-to-r from-indigo-600 to-purple-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-12 w-64 bg-white/20 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-6 w-96 bg-white/10 rounded-lg mx-auto mb-8 animate-pulse" />
          <div className="max-w-xl mx-auto">
            <div className="h-12 bg-white/20 rounded-xl animate-pulse" />
          </div>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="flex justify-center">
            <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    </main>
  );
}
