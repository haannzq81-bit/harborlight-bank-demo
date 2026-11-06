import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { budgets } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, ChipTabs, Page, PageHeader, StatusBadge, Table, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/team-spend/budgets")({
  head: pageHead("Budgets", "Team budgets on Oakline cards, with spend against each limit."),
  component: BudgetsPage,
});

const filters = ["Active", "Over limit", "Archived"] as const;

function BudgetsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Active");
  const list = filter === "Archived" ? [] : budgets.filter((b) => filter === "Active" || b.spent > b.amount);

  return (
    <Page>
      <PageHeader
        title="Budgets"
        actions={
          <Btn variant="primary" icon={Plus} onClick={() => demo("Create budget", "Set an amount, period and members — demo only.")}>
            Create budget
          </Btn>
        }
      />
      <ChipTabs tabs={filters} value={filter} onChange={setFilter} />
      <div className="mt-5">
        <Table minWidth={720}>
          <thead>
            <tr>
              <th className={th}>Budget</th>
              <th className={th}>Period</th>
              <th className={th}>Members</th>
              <th className={th + " w-[34%]"}>Spent</th>
              <th className={th + " text-right"}>Limit</th>
            </tr>
          </thead>
          <tbody>
            {list.map((b) => {
              const over = b.spent > b.amount;
              return (
                <tr key={b.name} className={tr} onClick={() => demo(`${b.name} budget`)}>
                  <td className={td}>
                    <span className="flex items-center gap-2">
                      {b.name}
                      {over && <StatusBadge tone="danger">Over limit</StatusBadge>}
                    </span>
                  </td>
                  <td className={td + " capitalize"}>{b.period}</td>
                  <td className={td}>
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      <Users className="size-3.5" /> {b.members}
                    </span>
                  </td>
                  <td className={td}>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
                        <div className={cn("h-full rounded-full", over ? "bg-negative" : "bg-primary")} style={{ width: `${Math.min((b.spent / b.amount) * 100, 100)}%` }} />
                      </div>
                      <Money value={b.spent} className="w-24 text-right" />
                    </div>
                  </td>
                  <td className={td + " text-right"}>
                    <Money value={b.amount} showCents={false} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {list.length === 0 && <p className="py-14 text-center text-[14px] text-muted-foreground">No archived budgets.</p>}
      </div>
    </Page>
  );
}
