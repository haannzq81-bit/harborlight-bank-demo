import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileSignature,
  FileText,
  LineChart,
  Map,
  UserPlus,
  Wallet,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AppSidebar } from "./AppSidebar";
import { BrandMark } from "./BrandMark";
import { PrivacyProvider } from "./privacy";
import { TopBar } from "./TopBar";
import { demo } from "./ui";

function DemoBanner({ onClose }: { onClose: () => void }) {
  const [role, setRole] = useState<"Admin" | "Teammate">("Admin");
  return (
    <div className="flex h-12 shrink-0 items-center gap-3 bg-banner px-4 text-banner-foreground lg:px-10">
      <BrandMark className="size-7 rounded-full bg-banner-muted" />
      <p className="min-w-0 flex-1 truncate text-[14px]">
        Explore the Oakline Demo.{" "}
        <button type="button" onClick={() => demo("Customize your experience")} className="ml-1 underline underline-offset-4 opacity-90 hover:opacity-100">
          Customize your experience
        </button>
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden items-center gap-1 rounded-full bg-banner-muted px-3 py-1 text-[13px] outline-none sm:inline-flex">
          Viewing as {role} <ChevronDown className="size-3.5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setRole("Admin")}>View as Admin</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setRole("Teammate")}>View as Teammate</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <button
        type="button"
        onClick={() => demo("Open an Oakline account")}
        className="rounded-full bg-primary-foreground px-3.5 py-1 text-[13px] font-medium text-primary transition-opacity hover:opacity-90"
      >
        Open account
      </button>
      <button type="button" aria-label="Dismiss banner" onClick={onClose} className="opacity-70 hover:opacity-100">
        <X className="size-4" />
      </button>
    </div>
  );
}

const guideTabs = ["Startup", "Ecommerce", "Agency", "More"] as const;
const guideItems = [
  { icon: Wallet, label: "Send money to contractors", to: "/payments/recipients" },
  { icon: UserPlus, label: "Invite your team members", to: "/team-spend" },
  { icon: CreditCard, label: "Create cards for your team", to: "/cards" },
  { icon: FileText, label: "Request vendor payment details", to: "/payments/bill-pay" },
  { icon: FileSignature, label: "Send an invoice to a client", to: "/invoicing" },
] as const;

function GuidePanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<(typeof guideTabs)[number]>("Startup");

  useEffect(() => {
    if (window.innerWidth >= 1440) setOpen(true);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[400px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-border bg-card p-5 shadow-pop">
          <div className="flex items-center justify-between">
            <p className="text-[15px] font-medium">Try out Oakline for yourself</p>
            <button type="button" aria-label="Collapse guide" onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <ChevronDown className="size-4" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {guideTabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-[13px]",
                  tab === t ? "border-primary/10 bg-primary-soft text-primary" : "border-border hover:bg-muted",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <ul className="mt-3 divide-y divide-border rounded-xl border border-border">
            {guideItems.map(({ icon: Icon, label, to }) => (
              <li key={label}>
                <Link to={to} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-[14px] hover:bg-muted">
                  <Icon className="size-4 text-muted-foreground" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-[14px]">
            <LineChart className="size-4 text-muted-foreground" />
            <span className="flex-1">Understand your data</span>
            <Link to="/command" onClick={() => setOpen(false)} className="rounded-full bg-secondary px-3 py-1 text-[13px] hover:bg-accent">
              Try Command
            </Link>
          </div>
        </div>
      )}
      <button
        type="button"
        aria-label={open ? "Close guide" : "Open guide"}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-pop hover:bg-muted"
      >
        {open ? <X className="size-5" /> : <Map className="size-5" />}
      </button>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [banner, setBanner] = useState(true);

  return (
    <PrivacyProvider>
      <div className="flex h-screen flex-col bg-background">
        {banner && <DemoBanner onClose={() => setBanner(false)} />}
        <div className="flex min-h-0 flex-1">
          <AppSidebar className="hidden overflow-y-auto lg:flex" />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetContent side="left" className="w-[240px] overflow-y-auto p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <AppSidebar className="w-full border-r-0" onNavigate={() => setMenuOpen(false)} />
            </SheetContent>
          </Sheet>

          <div id="app-scroll" className="min-w-0 flex-1 overflow-y-auto">
            <TopBar onMenu={() => setMenuOpen(true)} />
            {children}
          </div>
        </div>
        <GuidePanel />
      </div>
    </PrivacyProvider>
  );
}
