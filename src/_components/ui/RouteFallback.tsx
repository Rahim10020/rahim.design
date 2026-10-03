export default function RouteFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center"
    >
      <p className="text-foreground-alt-a">Chargement…</p>
    </div>
  );
}
