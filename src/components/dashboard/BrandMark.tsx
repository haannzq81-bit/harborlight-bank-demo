import { cn } from "@/lib/utils";

/** Post Oak leaf: rounded leaf with a chevron vein and short stem. */
function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M15.9 3.2c-2.6-.9-5.9.2-7.9 2.6-2.3 2.8-2.6 6.8-.9 9.6l-1.6 4.1a.9.9 0 1 0 1.7.7l1.5-3.9c2.8 1.6 6.6 1.1 9-1.4 2.6-2.7 3-6.8 1.2-9.6-.7-1-1.7-1.7-3-2.1Z"
      />
      <path
        d="m9.7 11.9 2.6-2.5 2.3 2.8"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Post Oak Group mark: white leaf in a green rounded square. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground",
        className,
      )}
      aria-hidden
    >
      <Leaf className="size-[64%]" />
    </span>
  );
}

/** Full Post Oak Group logo: mark + stacked wordmark. */
export function PostOakLogo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="Post Oak Group">
      <BrandMark className={compact ? "size-7 rounded-md" : "size-9"} />
      <span className="leading-none">
        <span className={cn("block font-bold tracking-[0.04em] text-primary", compact ? "text-[13px]" : "text-[15px]")}>POST OAK</span>
        <span
          className={cn(
            "mt-[3px] block font-semibold tracking-[0.32em] text-muted-foreground",
            compact ? "text-[9.5px]" : "text-[11px]",
          )}
        >
          GROUP
        </span>
      </span>
    </span>
  );
}

/** Small round account icon (Mercury uses its logo per account). */
export function AccountGlyph({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary-soft text-primary",
        className,
      )}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="size-3.5" aria-hidden>
        <path
          fill="currentColor"
          d="M15.9 3.2c-2.6-.9-5.9.2-7.9 2.6-2.3 2.8-2.6 6.8-.9 9.6l-1.6 4.1a.9.9 0 1 0 1.7.7l1.5-3.9c2.8 1.6 6.6 1.1 9-1.4 2.6-2.7 3-6.8 1.2-9.6-.7-1-1.7-1.7-3-2.1Z"
        />
      </svg>
    </span>
  );
}
