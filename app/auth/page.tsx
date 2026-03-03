export default function AuthPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="w-full max-w-sm space-y-6 rounded-2xl border border-foreground/10 bg-background/80 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-center">
          Sign in to 46.
        </h1>
        <form className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-xs font-medium uppercase tracking-[0.2em] text-foreground/70"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2 text-sm outline-none ring-0 focus:border-foreground focus:ring-0"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase tracking-[0.2em] text-foreground/70"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-md border border-foreground/20 bg-transparent px-3 py-2 text-sm outline-none ring-0 focus:border-foreground focus:ring-0"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/90"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}

