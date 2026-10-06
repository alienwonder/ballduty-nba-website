interface LegalPageProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="max-w-prose mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="prose-legal">
        <h1>{title}</h1>
        {lastUpdated && <p className="last-updated">Last updated: {lastUpdated}</p>}
        <hr className="border-[var(--border)] mb-8" />
        {children}
      </div>
    </div>
  );
}
