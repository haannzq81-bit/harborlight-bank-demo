import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { financing } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, Page, PageHeader, SectionTitle, StatusBadge, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/accounts/financing")({
  head: pageHead("Financing", "Oakline Working Capital line of credit: limit, outstanding balance and repayment schedule."),
  component: FinancingPage,
});

function FinancingPage() {
  const used = (financing.outstanding / financing.limit) * 100;
  return (
    <Page>
      <PageHeader
        title="Financing"
        actions={
          <>
            <Btn variant="ghost" onClick={() => demo("Make a payment")}>Make a payment</Btn>
            <Btn variant="primary" icon={Plus} onClick={() => demo("Draw funds")}>Draw funds</Btn>
          </>
        }
      />
      <section className="panel px-6 py-5">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="flex items-center gap-2 text-[14px]">
              Oakline Working Capital <StatusBadge tone="positive">Active</StatusBadge>
            </p>
            <Money value={financing.outstanding} className="mt-1 block font-display text-[30px] tracking-tight" />
            <p className="text-[13.5px] text-muted-foreground">
              outstanding of <Money value={financing.limit} showCents={false} /> line
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-8 text-[14px]">
            <div><dt className="text-muted-foreground">Next payment</dt><dd className="mt-0.5"><Money value={financing.nextPayment.amount} plain /></dd></div>
            <div><dt className="text-muted-foreground">Due</dt><dd className="mt-0.5">{financing.nextPayment.date}</dd></div>
            <div><dt className="text-muted-foreground">APR</dt><dd className="mt-0.5">{financing.apr}</dd></div>
          </dl>
        </div>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-primary" style={{ width: `${used}%` }} />
        </div>
        <p className="mt-2 text-[12.5px] text-muted-foreground">
          <Money value={financing.limit - financing.outstanding} showCents={false} /> available to draw
        </p>
      </section>

      <SectionTitle>Activity</SectionTitle>
      <table className="w-full text-[14px]">
        <thead>
          <tr>
            <th className={th + " pl-0"}>Date</th>
            <th className={th}>Type</th>
            <th className={th + " text-right"}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {financing.history.map((h, i) => (
            <tr key={i} className={tr} onClick={() => demo(`${h.label} · ${h.date}`)}>
              <td className={td + " pl-0"}>{h.date}</td>
              <td className={td}>{h.label}</td>
              <td className={td + " text-right"}><Money value={h.amount} className={h.amount > 0 ? "text-positive" : ""} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}
