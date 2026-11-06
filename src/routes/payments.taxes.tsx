import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Landmark, Plus } from "lucide-react";
import { taxPayments } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, ChipTabs, Page, PageHeader, StatTile, StatusBadge, Table, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/taxes")({
  head: pageHead("Taxes", "Federal and state tax payments scheduled and paid from Oakline."),
  component: TaxesPage,
});

const filters = ["All", "Scheduled", "Paid"] as const;

function TaxesPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const list = taxPayments.filter((t) => filter === "All" || t.status === filter);
  const scheduled = taxPayments.filter((t) => t.status === "Scheduled");
  const paid = taxPayments.filter((t) => t.status === "Paid");

  return (
    <Page>
      <PageHeader
        title="Taxes"
        actions={
          <Btn variant="primary" icon={Plus} onClick={() => demo("Pay taxes", "IRS and state payments via EFTPS — demo only.")}>
            Pay taxes
          </Btn>
        }
      />
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <StatTile value={<Money value={scheduled.reduce((s, t) => s + t.amount, 0)} />} label="Scheduled" sub={`${scheduled.length} upcoming payments · next Dec 15`} />
        <StatTile value={<Money value={paid.reduce((s, t) => s + t.amount, 0)} />} label="Paid in 2026" sub={`${paid.length} payments`} />
      </div>
      <ChipTabs tabs={filters} value={filter} onChange={setFilter} />
      <div className="mt-5">
        <Table minWidth={680}>
          <thead>
            <tr>
              <th className={th}>Tax</th>
              <th className={th}>Period</th>
              <th className={th}>Date</th>
              <th className={th}>Status</th>
              <th className={th + " text-right"}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {list.map((t) => (
              <tr key={t.type + t.period} className={tr} onClick={() => demo(t.type, `${t.period} · ${t.status}`)}>
                <td className={td}>
                  <span className="flex items-center gap-3">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-secondary">
                      <Landmark className="size-3.5 text-muted-foreground" />
                    </span>
                    {t.type}
                  </span>
                </td>
                <td className={td}>{t.period}</td>
                <td className={td + " text-muted-foreground"}>{t.date}</td>
                <td className={td}>
                  <StatusBadge tone={t.status === "Paid" ? "positive" : "info"}>{t.status}</StatusBadge>
                </td>
                <td className={td + " text-right"}>
                  <Money value={t.amount} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Page>
  );
}
