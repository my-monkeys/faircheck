import Link from 'next/link';

export const metadata = { title: 'Not found — Faircheck' };

// Root layout renders no <html>/<body> (that lives in [lang]/layout), so the global
// not-found provides its own shell.
export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="wrap" style={{ paddingBlock: '72px', textAlign: 'center' }}>
          <span className="label">404</span>
          <h1 className="h1 mt-2">Nothing to verify here</h1>
          <p className="lead mt-3">That page does not exist.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/en" className="btn">Universal verifier</Link>
            <Link href="/en/casinos" className="btn btn-ghost">Browse casinos</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
