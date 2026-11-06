import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeftRight, Download, ListFilter, Paperclip, Search, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { transactions } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, Check, FilterMenu, Page, PageHeader, StatusBadge, Table, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/transactions/")({
  head: pageHead("Transactions", "Every Oakline transaction across accounts and cards, with filters, categories and receipts."),
  component: TransactionsPage,
});

const accountsFilter = ["All accounts", "Operating", "Payroll", "Reserve", "Treasury", "Credit Card"] as const;
const dateFilter = ["Date", "Last 7 days", "Last 30 days", "This month", "Last month"] as const;
const directionFilter = ["Amount", "Money in", "Money out"] as const;

function TransactionsPage() {
  const [q, setQ] = useState("");
  const [account, setAccount] = useState<(typeof accountsFilter)[number]>("All accounts");
  const [direction, setDirection] = useState<(typeof directionFilter)[number]>("Amount");

  const rows = useMemo(
    () =>
      transactions.filter(
        (t) =>
          (account === "All accounts" || t.account === account) &&
          (direction === "Amount" || (direction === "Money in" ? t.amount > 0 : t.amount < 0)) &&
          (!q || `${t.party} ${t.method} ${t.tag ?? ""}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [q, account, direction],
  );
  const moneyIn = rows.filter((t) => t.amount > 0 && t.status !== "Failed").reduce((s, t) => s + t.amount, 0);
  const moneyOut = rows.filter((t) => t.amount < 0 && t.status !== "Failed").reduce((s, t) => s + t.amount, 0);

  return (
    <Page className="max-w-[1120px]">
      <PageHeader
        title="Transactions"
        actions={
          <>
            <Btn variant="ghost" icon={Download} onClick={() => demo("Export transactions", "CSV, QuickBooks and NetSuite exports are demo only.")}>
              Export
            </Btn>
            <Btn variant="ghost" icon={SlidersHorizontal} onClick={() => demo("Display settings")}>
              Display
            </Btn>
          </>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="flex h-8 w-full items-center gap-2 rounded-md border border-border bg-card px-3 text-[13.5px] sm:w-64">
          <Search className="size-3.5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search transactions"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </label>
        <FilterMenu label="Date" options={dateFilter} />
        <FilterMenu label="All accounts" options={accountsFilter} value={account} onChange={setAccount} />
        <FilterMenu label="Amount" options={directionFilter} value={direction} onChange={setDirection} />
        <Btn variant="outline" icon={ListFilter} onClick={() => demo("More filters")}>
          Filters
        </Btn>
      </div>

      <div className="panel mb-5 grid grid-cols-3 divide-x divide-border text-[13.5px]">
        <div className="px-5 py-3">
          <p className="text-muted-foreground">Net change</p>
          <Money value={moneyIn + moneyOut} signed className="mt-0.5 block text-[17px]" />
        </div>
        <div className="px-5 py-3">
          <p className="text-muted-foreground">Money in</p>
          <Money value={moneyIn} className="mt-0.5 block text-[17px] text-positive" />
        </div>
        <div className="px-5 py-3">
          <p className="text-muted-foreground">Money out</p>
          <Money value={moneyOut} className="mt-0.5 block text-[17px]" />
        </div>
      </div>

      <Table minWidth={900}>
        <thead>
          <tr>
            <th className={th + " w-8"}>
              <Check label="Select all" />
            </th>
            <th className={th}>Date</th>
            <th className={th}>To/From</th>
            <th className={th + " text-right"}>Amount</th>
            <th className={th + " pl-8"}>Account</th>
            <th className={th}>Method</th>
            <th className={th}>Category</th>
            <th className={th + " text-center"}>
              <Paperclip className="inline size-3.5" />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t, i) => (
            <tr key={`${t.party}-${i}`} className={tr} onClick={() => demo(t.party, `${t.date} · ${t.method} · ${t.account}`)}>
              <td className={td}>
                <Check label={`Select ${t.party}`} />
              </td>
              <td className={td + " whitespace-nowrap text-muted-foreground"}>{t.date}</td>
              <td className={td}>
                <span className="flex items-center gap-2.5">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary text-[9.5px] font-medium text-secondary-foreground">
                    {t.category === "transfer" ? <ArrowLeftRight className="size-3" /> : t.initials}
                  </span>
                  <span className="truncate">{t.party}</span>
                  {t.status && <StatusBadge tone={t.status === "Failed" ? "danger" : "warning"}>{t.status}</StatusBadge>}
                </span>
              </td>
              <td className={td + " whitespace-nowrap text-right"}>
                <Money value={t.amount} className={cn(t.amount > 0 && "text-positive", t.status === "Failed" && "line-through opacity-60")} />
              </td>
              <td className={td + " whitespace-nowrap pl-8"}>{t.account}</td>
              <td className={td + " whitespace-nowrap text-muted-foreground"}>{t.method}</td>
              <td className={td + " whitespace-nowrap"}>
                {t.tag ? <StatusBadge>{t.tag}</StatusBadge> : <span className="text-muted-foreground">—</span>}
              </td>
              <td className={td + " text-center"}>
                {t.receipt ? <Paperclip className="inline size-3.5 text-primary" /> : t.category === "card" ? <span className="text-[12px] text-warning-strong">Missing</span> : null}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {rows.length === 0 && <p className="py-16 text-center text-[14px] text-muted-foreground">No transactions match these filters.</p>}
    </Page>
  );
}
