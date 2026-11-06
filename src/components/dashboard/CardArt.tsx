import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

/** Oakline debit/credit card visual. */
export function CardArt({
  last4,
  holder,
  type = "Physical",
  muted = false,
  className,
}: {
  last4: string;
  holder?: string;
  type?: "Physical" | "Virtual";
  muted?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[1.586] flex-col justify-between overflow-hidden rounded-xl p-4 text-primary-foreground shadow-card",
        type === "Physical" ? "bg-primary" : "bg-primary/75",
        muted && "opacity-50 grayscale",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <BrandMark className="size-6 rounded-full bg-primary-foreground/15" />
        <span className="text-[10.5px] uppercase tracking-[0.14em] opacity-80">{type}</span>
      </div>
      <div>
        {holder && <p className="truncate text-[11.5px] opacity-80">{holder}</p>}
        <p className="tabular text-[14px] tracking-[0.12em]">•••• {last4}</p>
      </div>
    </div>
  );
}
