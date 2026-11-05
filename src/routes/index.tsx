import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { moveMoneyActions } from "@/components/dashboard/TopBar";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { AccountsCard } from "@/components/dashboard/AccountsCard";
import { BillPayModule, CreditCardModule, InvoicingModule } from "@/components/dashboard/ModuleCards";
import { MoneyMovement } from "@/components/dashboard/MoneyMovement";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { user } from "@/components/dashboard/data";
import { Page, demo } from "@/components/dashboard/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Oakline Banking by Post Oak Group" },
      { name: "description", content: "Oakline Banking business dashboard: balances, accounts, money movement and transactions in one place." },
      { property: "og:title", content: "Home — Oakline Banking by Post Oak Group" },
      { property: "og:description", content: "Oakline Banking business dashboard: balances, accounts, money movement and transactions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [modules, setModules] = useState({ credit: true, bills: true, invoicing: true, disputes: false });
  const visibleModules = [modules.credit, modules.bills, modules.invoicing].filter(Boolean).length;

  return (
    <Page>
      <h1 className="font-display text-[28px] font-normal tracking-tight">Welcome, {user.firstName}</h1>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {moveMoneyActions.map(({ label, icon: Icon }, i) => (
          <button
            key={label}
            type="button"
            onClick={() => demo(`${label} flow`, "Demo only — no money moves.")}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[14px] transition-colors",
              i === 0 ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-accent",
            )}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto inline-flex h-8 items-center gap-1 rounded-md px-2 text-[14px] text-foreground outline-none hover:bg-secondary">
            <EllipsisVertical className="size-3.5" /> Customize
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuCheckboxItem checked={modules.disputes} onCheckedChange={(v) => setModules((m) => ({ ...m, disputes: !!v }))}>
              Show Dispute Status
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={!modules.credit} onCheckedChange={(v) => setModules((m) => ({ ...m, credit: !v }))}>
              Hide Credit Card
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={!modules.bills} onCheckedChange={(v) => setModules((m) => ({ ...m, bills: !v }))}>
              Hide Bill Pay
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem checked={!modules.invoicing} onCheckedChange={(v) => setModules((m) => ({ ...m, invoicing: !v }))}>
              Hide Invoicing
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => demo("Thanks — feature request noted")}>Request feature</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <BalanceCard />
        <AccountsCard />
      </div>

      {modules.disputes && (
        <div className="panel mt-6 flex items-center justify-between px-6 py-4 text-[14px]">
          <span>Dispute status</span>
          <span className="text-muted-foreground">No open disputes</span>
        </div>
      )}

      {visibleModules > 0 && (
        <div className={cn("mt-10 grid gap-6", visibleModules === 3 && "md:grid-cols-3", visibleModules === 2 && "md:grid-cols-2")}>
          {modules.credit && <CreditCardModule />}
          {modules.bills && <BillPayModule />}
          {modules.invoicing && <InvoicingModule />}
        </div>
      )}

      <div className="mt-12">
        <MoneyMovement />
      </div>

      <div className="mt-12">
        <TransactionsTable />
      </div>
    </Page>
  );
}
