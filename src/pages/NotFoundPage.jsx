import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 — Toby</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-[clamp(64px,15vw,120px)] text-gold leading-none">404</h1>
        <p className="font-body text-lg text-cream-dim mt-4 mb-8">Page not found.</p>
        <Link to="/" className="font-mono text-sm text-gold border border-gold-dim/25 bg-gold-faint px-5 py-2.5 rounded-lg hover:bg-gold hover:text-base-bg transition-all duration-250">
          ← Back home
        </Link>
      </div>
    </>
  );
}
