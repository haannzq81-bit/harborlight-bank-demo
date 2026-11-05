import type { ReactNode } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

/** Demo-only action feedback. */
export function demo(label: string, description = "Demo only — nothing is sent or saved.") {
  toast(label, { description });
}

export function pageHead(title: string, description: string) {
  const full = `${title} — Oakline Banking`;
  return () => ({
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  });
}

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return <main className={cn("mx-auto w-full max-w-[1000px] px-4 pb-24 pt-10 sm:px-8", className)}>{children}</main>;
}

export function PageHeader({
  title,
  badge,
  actions,
  className,
}: {
  title: string;
  badge?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex flex-wrap items-center gap-3", className)}>
      <h1 className="font-display text-[28px] font-normal tracking-tight">{title}</h1>
      {badge}
      {actions && <div className="ml-auto flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Btn({
  children,
  icon: Icon,
  variant = "secondary",
  onClick,
  className,
}: {
  children?: ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[13.5px] font-medium transition-colors",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-accent",
        variant === "ghost" && "text-foreground hover:bg-secondary",
        variant === "outline" && "rounded-md border border-border bg-card font-normal text-foreground hover:bg-muted",
        className,
      )}
    >
      {Icon && <Icon className="size-3.5" />}
      {children}
    </button>
  );
}

export function FeedbackBadge() {
  return (
    <button
      type="button"
      onClick={() => demo("Thanks — feedback noted")}
      className="rounded-md bg-primary-soft px-2 py-0.5 text-[11.5px] font-medium text-primary"
    >
      Feedback
    </button>
  );
}

/** Bordered dropdown filter, Mercury-style. */
export function FilterMenu<T extends string>({
  label,
  options,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  options?: readonly T[];
  value?: T;
  onChange?: (v: T) => void;
  icon?: LucideIcon;
}) {
  const shown = value && value !== options?.[0] ? value : label;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-[13.5px] text-foreground outline-none hover:bg-muted">
        {Icon && <Icon className="size-3.5 text-muted-foreground" />}
        {shown}
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuRadioGroup value={value ?? options?.[0]} onValueChange={(v) => onChange?.(v as T)}>
          {(options ?? (["Any"] as unknown as T[])).map((o) => (
            <DropdownMenuRadioItem key={o} value={o}>
              {o}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function UnderlineTabs<T extends string>({
  tabs,
  value,
  onChange,
  right,
  className,
}: {
  tabs: readonly { id: T; label: string; count?: number }[];
  value: T;
  onChange: (v: T) => void;
  right?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-5 flex items-end gap-6 border-b border-border", className)}>
      <div role="tablist" className="flex gap-6 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={value === t.id}
            onClick={() => onChange(t.id)}
            className={cn(
              "-mb-px flex shrink-0 items-center gap-1.5 border-b-2 pb-2.5 text-[13.5px] transition-colors",
              value === t.id ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
            {t.count !== undefined && (
              <span className="rounded bg-secondary px-1.5 text-[11px] tabular text-secondary-foreground">{t.count}</span>
            )}
          </button>
        ))}
      </div>
      {right && <div className="ml-auto pb-2">{right}</div>}
    </div>
  );
}

export function ChipTabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          className={cn(
            "h-8 rounded-md border px-3 text-[13.5px] transition-colors",
            value === t ? "border-primary/15 bg-primary-soft text-primary" : "border-border text-foreground hover:bg-muted",
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export type Tone = "neutral" | "warning" | "danger" | "positive" | "info";

export function StatusBadge({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded px-1.5 py-0.5 text-[11.5px] font-medium",
        tone === "neutral" && "bg-secondary text-secondary-foreground",
        tone === "warning" && "bg-warning/15 text-foreground",
        tone === "danger" && "bg-negative/10 text-negative",
        tone === "positive" && "bg-positive/10 text-positive",
        tone === "info" && "bg-primary-soft text-primary",
      )}
    >
      {children}
    </span>
  );
}

export function Initials({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[10px] font-medium text-primary",
        className,
      )}
    >
      {text}
    </span>
  );
}

export function StatTile({
  value,
  label,
  sub,
  tone,
  onClick,
}: {
  value: ReactNode;
  label: string;
  sub?: ReactNode;
  tone?: "warning" | "muted";
  onClick?: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="panel px-6 py-5 text-left transition-shadow hover:shadow-pop">
      <p
        className={cn(
          "font-display text-[28px] font-normal tracking-tight",
          tone === "warning" && "text-warning-strong",
          tone === "muted" && "text-muted-foreground",
        )}
      >
        {value}
      </p>
      <p className={cn("mt-0.5 text-[15px]", tone === "muted" && "text-muted-foreground")}>{label}</p>
      {sub && <p className="mt-1 text-[13.5px] text-muted-foreground">{sub}</p>}
    </button>
  );
}

export function Check({ label }: { label: string }) {
  return (
    <input
      type="checkbox"
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
      className="size-4 cursor-pointer rounded border-border accent-primary"
    />
  );
}

/** Table cell class helpers for Mercury-style lists. */
export const th = "px-3 py-2.5 text-left text-[12px] font-normal text-muted-foreground whitespace-nowrap";
export const td = "px-3 py-3 align-middle";
export const tr = "cursor-pointer border-t border-border transition-colors hover:bg-muted";

export function Table({ children, minWidth = 760 }: { children: ReactNode; minWidth?: number }) {
  return (
    <div className="-mx-3 overflow-x-auto">
      <table className="w-full text-[13.5px]" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

export function SectionTitle({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-3 mt-10 flex items-center justify-between">
      <h2 className="text-[19px] tracking-tight">{children}</h2>
      {right}
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="panel flex flex-col items-center px-6 py-14 text-center">
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary">
        <Icon className="size-5" />
      </span>
      <p className="mt-4 text-[15px] font-medium">{title}</p>
      <p className="mt-1 max-w-sm text-[13.5px] text-muted-foreground">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
