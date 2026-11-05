import {
  ArrowLeftRight,
  BookOpen,
  Bookmark,
  ChevronsUpDown,
  CircleCheck,
  CreditCard,
  FileText,
  Home,
  Landmark,
  LayoutGrid,
  Send,
  Split,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { PostOakLogo } from "./BrandMark";
import { tasks } from "./data";
import { Money } from "./privacy";
import { demo } from "./ui";

type Section = {
  label: string;
  icon: LucideIcon;
  to: string;
  base?: string;
  count?: number;
  badge?: string;
  children?: { label: string; to: string }[];
};

const primaryNav: Section[] = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Tasks", icon: CircleCheck, to: "/tasks", count: tasks.length },
  { label: "Command", icon: SquareTerminal, to: "/command", badge: "New" },
];

const bankingNav: Section[] = [
  {
    label: "Accounts",
    icon: Landmark,
    to: "/accounts",
    children: [
      { label: "Treasury", to: "/accounts/treasury" },
      { label: "Financing", to: "/accounts/financing" },
    ],
  },
  { label: "Transactions", icon: ArrowLeftRight, to: "/transactions", children: [{ label: "Insights", to: "/transactions/insights" }] },
  { label: "Cards", icon: CreditCard, to: "/cards", children: [{ label: "Credit Card", to: "/cards/credit-card" }] },
  {
    label: "Team Spend",
    icon: Split,
    to: "/team-spend",
    children: [
      { label: "Budgets", to: "/team-spend/budgets" },
      { label: "Reimbursements", to: "/team-spend/reimbursements" },
      { label: "Policies", to: "/team-spend/policies" },
    ],
  },
  {
    label: "Payments",
    icon: Send,
    to: "/payments/recipients",
    base: "/payments",
    children: [
      { label: "Bill Pay", to: "/payments/bill-pay" },
      { label: "Recipients", to: "/payments/recipients" },
      { label: "Taxes", to: "/payments/taxes" },
      { label: "Wire Drawdowns", to: "/payments/wire-drawdowns" },
      { label: "ACH Authorizations", to: "/payments/ach-authorizations" },
      { label: "Checkbooks", to: "/payments/checkbooks" },
    ],
  },
  {
    label: "Invoicing",
    icon: FileText,
    to: "/invoicing",
    children: [
      { label: "Recurring Series", to: "/invoicing/recurring" },
      { label: "Customers", to: "/invoicing/customers" },
      { label: "Catalog", to: "/invoicing/catalog" },
    ],
  },
  { label: "Accounting", icon: BookOpen, to: "/accounting" },
];

const products = [
  { label: "Banking", to: "/" },
  { label: "Payroll", to: "/payroll" },
  { label: "Books", to: "/books" },
] as const;

const bookmarks = [
  { label: "Credit Card", to: "/cards/credit-card" },
  { label: "Bill Pay", to: "/payments/bill-pay" },
  { label: "Insights", to: "/transactions/insights" },
];

function NavItem({ item, path, onNavigate }: { item: Section; path: string; onNavigate?: (() => void) | undefined }) {
  const { label, icon: Icon, to, count, badge, children } = item;
  const base = item.base ?? to;
  const inSection = to === "/" ? path === "/" : path === base || path.startsWith(`${base}/`);
  const exact = path === to && !(item.base && children?.some((c) => c.to === path));
  const active = to === "/" ? path === "/" : exact;

  return (
    <div>
      <Link
        to={to}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-[14px] text-sidebar-foreground transition-colors",
          active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/70",
        )}
      >
        <Icon className={cn("size-4 shrink-0", active ? "text-foreground" : "text-muted-foreground")} strokeWidth={1.6} />
        <span className="flex-1 text-left">{label}</span>
        {count !== undefined && <span className="tabular text-xs text-muted-foreground">{count}</span>}
        {badge && <span className="rounded bg-primary-soft px-1.5 py-0.5 text-[10.5px] font-medium text-primary">{badge}</span>}
      </Link>
      {inSection && children && (
        <div className="my-1 ml-[15px] border-l border-sidebar-border">
          {children.map((c) => {
            const on = path === c.to;
            return (
              <Link
                key={c.to}
                to={c.to}
                onClick={onNavigate}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "-ml-px flex h-8 items-center border-l pl-[16px] text-[14px] transition-colors",
                  on ? "border-foreground text-foreground" : "border-transparent text-sidebar-foreground hover:text-foreground",
                )}
              >
                {c.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function AppSidebar({ className, onNavigate }: { className?: string; onNavigate?: (() => void) | undefined }) {
  const path = useRouterState({ select: (s) => s.location.pathname }).replace(/\/$/, "") || "/";
  const product = path.startsWith("/payroll") ? "Payroll" : path.startsWith("/books") ? "Books" : "Banking";

  return (
    <aside className={cn("flex h-full w-[220px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar", className)}>
      <div className="px-2.5 pt-3">
        <button
          type="button"
          onClick={() => demo("Switch organization", "Post Oak Group is the only organization in this demo.")}
          className="flex w-full items-center gap-2 rounded-md px-1.5 py-1.5 text-left hover:bg-sidebar-accent/70"
        >
          <PostOakLogo compact className="min-w-0 flex-1" />
          <span className="rounded bg-foreground px-1.5 py-0.5 text-[10px] font-semibold text-background">Pro</span>
          <ChevronsUpDown className="size-3.5 text-muted-foreground" />
        </button>

        <div className="mt-3 grid grid-cols-3 rounded-lg bg-secondary p-0.5 text-[13px]">
          {products.map((p) => (
            <Link
              key={p.label}
              to={p.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center justify-center gap-1 rounded-md py-1 transition-colors",
                product === p.label ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {p.label === "Banking" && <Landmark className="size-3" />}
              {p.label}
            </Link>
          ))}
        </div>

        <nav className="mt-3 space-y-0.5">
          {primaryNav.map((item) => (
            <NavItem key={item.label} item={item} path={path} onNavigate={onNavigate} />
          ))}
        </nav>
      </div>

      <div className="my-3 border-t border-sidebar-border" />

      <nav className="space-y-0.5 px-2.5">
        {bankingNav.map((item) => (
          <NavItem key={item.label} item={item} path={path} onNavigate={onNavigate} />
        ))}
      </nav>

      <div className="my-3 border-t border-sidebar-border" />

      <div className="px-2.5 pb-6">
        <div className="flex items-center justify-between px-2 pb-1.5">
          <span className="text-[11.5px] font-medium text-muted-foreground">Bookmarks</span>
          <button type="button" aria-label="Manage bookmarks" onClick={() => demo("Manage bookmarks")}>
            <LayoutGrid className="size-3.5 text-muted-foreground" />
          </button>
        </div>
        <div className="space-y-0.5">
          <Link
            to="/accounts"
            onClick={onNavigate}
            className="flex w-full items-start gap-2.5 rounded-md px-2 py-1.5 text-left hover:bg-sidebar-accent/70"
          >
            <Bookmark className="mt-0.5 size-4 text-muted-foreground" strokeWidth={1.6} />
            <span className="leading-tight">
              <span className="block text-[14px] text-sidebar-foreground">Operating</span>
              <Money value={1284512.4} plain className="block text-xs text-muted-foreground" />
            </span>
          </Link>
          {bookmarks.map((b) => (
            <Link
              key={b.to}
              to={b.to}
              onClick={onNavigate}
              className={cn(
                "flex h-8 items-center gap-2.5 rounded-md px-2 text-[14px] text-sidebar-foreground hover:bg-sidebar-accent/70",
                path === b.to && "bg-sidebar-accent",
              )}
            >
              <Bookmark className="size-4 text-muted-foreground" strokeWidth={1.6} />
              {b.label}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
