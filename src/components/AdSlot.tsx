/**
 * Reserved monetisation container.
 *
 * Renders nothing visible until `children` (an ad script, affiliate card, etc.)
 * is passed in, so layout is already planned for revenue placements.
 */
interface AdSlotProps {
  id: string;
  label?: string;
  children?: React.ReactNode;
  className?: string;
}

export function AdSlot({ id, label, children, className = "" }: AdSlotProps) {
  if (!children) return <div data-ad-slot={id} aria-hidden className="hidden" />;

  return (
    <aside data-ad-slot={id} className={`rounded-2xl border border-border bg-card/60 p-4 ${className}`}>
      {label ? (
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
      ) : null}
      {children}
    </aside>
  );
}
