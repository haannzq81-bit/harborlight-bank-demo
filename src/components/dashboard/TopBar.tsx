import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  ArrowLeftToLine,
  Bell,
  Eye,
  EyeOff,
  FileUp,
  Menu,
  Plus,
  Search,
  Send,
  Settings,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { recipients, transactions, user } from "./data";
import { usePrivacy } from "./privacy";
import { demo } from "./ui";

export const moveMoneyActions = [
  { label: "Send", icon: Send },
  { label: "Transfer", icon: ArrowLeftRight },
  { label: "Deposit", icon: Plus },
  { label: "Request", icon: ArrowLeftToLine },
  { label: "Upload bill", icon: FileUp },
];

const searchPages = [
  ["Home", "/"],
  ["Tasks", "/tasks"],
  ["Command", "/command"],
  ["Accounts", "/accounts"],
  ["Treasury", "/accounts/treasury"],
  ["Financing", "/accounts/financing"],
  ["Transactions", "/transactions"],
  ["Insights", "/transactions/insights"],
  ["Cards", "/cards"],
  ["Credit Card", "/cards/credit-card"],
  ["Team Spend", "/team-spend"],
  ["Budgets", "/team-spend/budgets"],
  ["Reimbursements", "/team-spend/reimbursements"],
  ["Policies", "/team-spend/policies"],
  ["Bill Pay", "/payments/bill-pay"],
  ["Recipients", "/payments/recipients"],
  ["Taxes", "/payments/taxes"],
  ["Wire Drawdowns", "/payments/wire-drawdowns"],
  ["ACH Authorizations", "/payments/ach-authorizations"],
  ["Checkbooks", "/payments/checkbooks"],
  ["Invoicing", "/invoicing"],
  ["Recurring Series", "/invoicing/recurring"],
  ["Customers", "/invoicing/customers"],
  ["Catalog", "/invoicing/catalog"],
  ["Accounting", "/accounting"],
  ["Payroll", "/payroll"],
  ["Books", "/books"],
  ["Settings", "/settings"],
] as const;

function IconButton({ label, onClick, children }: { label: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          className="relative inline-flex size-8 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function SearchPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const go = (to: string) => {
    onOpenChange(false);
    void navigate({ to });
  };
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search for anything" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Pages">
          {searchPages.map(([label, to]) => (
            <CommandItem key={to} onSelect={() => go(to)}>
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Recipients">
          {recipients.slice(0, 6).map((r) => (
            <CommandItem key={r.name} onSelect={() => go("/payments/recipients")}>
              {r.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Transactions">
          {transactions.slice(0, 6).map((t, i) => (
            <CommandItem key={`${t.party}-${i}`} value={`${t.party} ${t.date} ${i}`} onSelect={() => go("/transactions")}>
              {t.party} <span className="ml-auto text-xs text-muted-foreground">{t.date}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function TopBar({ onMenu }: { onMenu: () => void }) {
  const { hidden, toggle } = usePrivacy();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-12 items-center gap-3 bg-background px-4 lg:px-6">
      <button
        type="button"
        aria-label="Open menu"
        onClick={onMenu}
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary lg:hidden"
      >
        <Menu className="size-4" />
      </button>

      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="flex min-w-0 flex-1 items-center gap-2 text-[14px] text-foreground/80 hover:text-foreground"
      >
        <Search className="size-3.5 shrink-0" />
        <span className="truncate">Search for anything</span>
      </button>
      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />

      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="mr-2 inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-[14px] text-foreground transition-colors hover:bg-secondary"
            >
              <ArrowLeftRight className="size-3.5" />
              <span className="hidden sm:inline">Move money</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {moveMoneyActions.map(({ label, icon: Icon }) => (
              <DropdownMenuItem key={label} onSelect={() => demo(`${label} flow`, "Demo only — no money moves.")}>
                <Icon className="size-4" /> {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <IconButton label={hidden ? "Show balances" : "Hide balances"} onClick={toggle}>
          {hidden ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
        </IconButton>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/settings"
              aria-label="Settings"
              className="inline-flex size-8 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Settings className="size-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>Settings</TooltipContent>
        </Tooltip>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Updates"
              className="relative inline-flex size-8 items-center justify-center rounded-md text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Bell className="size-4" />
              <span className="absolute right-2 top-1.5 size-1.5 rounded-full bg-primary" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Updates</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              ["Incoming wire received", "$128,500.00 from Westbrook Capital Partners"],
              ["Payment failed", "Meridian Health invoice payment of $419.00"],
              ["Card spend over budget", "Travel budget is $284.60 over limit"],
            ].map(([t, d]) => (
              <DropdownMenuItem key={t} className="flex-col items-start gap-0.5">
                <span className="text-[13px] font-medium">{t}</span>
                <span className="text-xs text-muted-foreground">{d}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Account menu"
              className="ml-1 inline-flex size-8 items-center justify-center rounded-full bg-primary text-[11.5px] font-semibold text-primary-foreground"
            >
              {user.initials}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-medium">{user.fullName}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["Profile", "Notifications", "Security", "Team", "Company"].map((l) => (
              <DropdownMenuItem key={l} asChild>
                <Link to="/settings">{l}</Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => demo("Log out", "Disabled in the demo.")}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
