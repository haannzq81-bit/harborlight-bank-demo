import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { budgets, reimbursements, teamMembers, teamSpendByCategory } from "@/components/dashboard/data";
import { Compact, Money } from "@/components/dashboard/privacy";
import { Btn, FilterMenu, Initials, Page, PageHeader, SectionTitle, StatTile, StatusBadge, Table, UnderlineTabs, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/team-spend/")({
  head: pageHead("Team Spend", "Team spend by category and person, with budgets, reimbursements and missing receipts."),
  component: TeamSpendPage,
});

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "people", label: "Team members", count: teamMembers.length },
] as const;

function TeamSpendPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("overview");
  const navigate = useNavigate();
  const total = teamSpendByCategory.reduce((s, c) => s + c.value, 0);
  const max = Math.max(...teamSpendByCategory.map((c) => c.value));
  const overBudget = budgets.filter((b) => b.spent > b.amount).length;
  const toReview = reimbursements.filter((r) => r.status === "Needs review");

  return (
    <Page>
      <PageHeader
        title="Team Spend"
        actions={
          <>
            <Btn variant="ghost" icon={UserPlus} onClick={() => demo("Invite teammate")}>
              Invite
            </Btn>
            <Btn variant="primary" onClick={() => demo("Create budget")}>
              Create budget
            </Btn>
          </>
        }
      />
      <UnderlineTabs tabs={tabs} value={tab} onChange={setTab} right={<FilterMenu label="Last 30 days" options={["Last 30 days", "This month", "This quarter", "Year to date"] as const} />} />

      {tab === "overview" ? (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <StatTile value={<Compact value={total} />} label="Spent on cards" sub="Across 10 cards and 5 people" />
            <StatTile value={overBudget} label="Budgets over limit" tone="warning" sub="Travel is $284.60 over" onClick={() => navigate({ to: "/team-spend/budgets" })} />
            <StatTile value={toReview.length} label="Reimbursements to review" sub={<Money value={toReview.reduce((s, r) => s + r.amount, 0)} />} onClick={() => navigate({ to: "/team-spend/reimbursements" })} />
          </div>

          <SectionTitle>Spend by category</SectionTitle>
          <section className="panel divide-y divide-border">
            {teamSpendByCategory.map((c) => (
              <button key={c.name} type="button" onClick={() => demo(c.name)} className="flex w-full items-center gap-4 px-5 py-3 text-left text-[14px] hover:bg-muted">
                <span className="w-32 shrink-0">{c.name}</span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <span className="block h-full rounded-full bg-primary" style={{ width: `${(c.value / max) * 100}%` }} />
                </span>
                <span className="w-10 text-right text-muted-foreground">{Math.round((c.value / total) * 100)}%</span>
                <Compact value={c.value} className="w-16 text-right" />
              </button>
            ))}
          </section>

          <SectionTitle>Budgets</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {budgets.map((b) => {
              const pct = Math.min((b.spent / b.amount) * 100, 100);
              const over = b.spent > b.amount;
              return (
                <button key={b.name} type="button" onClick={() => navigate({ to: "/team-spend/budgets" })} className="panel px-5 py-4 text-left hover:shadow-pop">
                  <div className="flex items-center justify-between text-[14px]">
                    <span>{b.name}</span>
                    {over && <StatusBadge tone="danger">Over limit</StatusBadge>}
                  </div>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    <Money value={b.spent} /> of <Money value={b.amount} showCents={false} /> {b.period}
                  </p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className={cn("h-full rounded-full", over ? "bg-negative" : "bg-primary")} style={{ width: `${pct}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <Table minWidth={680}>
          <thead>
            <tr>
              <th className={th}>Name</th>
              <th className={th}>Role</th>
              <th className={th}>Cards</th>
              <th className={th + " text-right"}>Spent</th>
              <th className={th + " pl-8"}>Missing</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((m) => (
              <tr key={m.name} className={tr} onClick={() => demo(m.name, m.role)}>
                <td className={td}>
                  <span className="flex items-center gap-3">
                    <Initials text={m.initials} />
                    {m.name}
                    {m.you && <span className="text-muted-foreground">(You)</span>}
                  </span>
                </td>
                <td className={td}>{m.role}</td>
                <td className={td}>{m.cards}</td>
                <td className={td + " text-right"}>
                  <Money value={m.spent} />
                </td>
                <td className={td + " pl-8"}>
                  {m.missing === "All set" ? <span className="text-muted-foreground">All set</span> : <StatusBadge tone="warning">{m.missing}</StatusBadge>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Page>
  );
}
