import Link from "next/link";

export default function NotFound() {
  return (
    <main className="ks-scope ks-cloud flex min-h-screen items-center justify-center px-5 py-16 text-k-navy">
      <div className="max-w-xl border-t-4 border-k-sky bg-white p-10">
        <p className="ks-eyebrow text-k-muted">404</p>
        <h1 className="ks-h2-passage mt-3">That page isn&apos;t here.</h1>
        <p className="ks-body mt-4 text-k-muted">
          Return to the Simple Medical Staffing website to find staffing and career information.
        </p>
        <Link href="/" className="ks-btn ks-btn-primary ks-focus mt-7">
          Return Home
        </Link>
      </div>
    </main>
  );
}
