import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownToLine, Info } from "lucide-react";
import { wireDrawdowns } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, Initials, Page, PageHeader, SectionTitle, StatusBadge, Table, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/wire-drawdowns")({
  head: pageHead("Wire Drawdowns", "Request funds by wire drawdown and review drawdown history on Oakline accounts."),
  component: WireDrawdownsPage,
});

function WireDrawdownsPage() {
  return (
    <Page>
      <PageHeader
        title="Wire Drawdowns"
        actions={
          <Btn variant="primary" icon={ArrowDownToLine} onClick={() => demo("Request drawdown", "Pull funds from another bank by wire — demo only.")}>
            Request drawdown
          </Btn>
        }
      />
      <div className="panel flex items-start gap-3 px-5 py-4 text-[14px]">
        <Info className="mt-0.5 size-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          A wire drawdown lets you pull funds into Oakline from an account you or a counterparty authorized at another bank. Funds usually arrive the same business day.
        </p>
      </div>

      <SectionTitle>History</SectionTitle>
      <Table minWidth={640}>
        <thead>
          <tr>
            <th className={th}>From</th>
            <th className={th}>Date</th>
            <th className={th}>To account</th>
            <th className={th}>Status</th>
            <th className={th + " text-right"}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {wireDrawdowns.map((w) => (
            <tr key={w.requester + w.date} className={tr} onClick={() => demo(w.requester, `${w.date} · ${w.status}`)}>
              <td className={td}>
                <span className="flex items-center gap-3">
                  <Initials text={w.requester.split(" ").slice(0, 2).map((p) => p[0]).join("")} />
                  {w.requester}
                </span>
              </td>
              <td className={td + " text-muted-foreground"}>{w.date}</td>
              <td className={td}>{w.account}</td>
              <td className={td}>
                <StatusBadge tone="positive">{w.status}</StatusBadge>
              </td>
              <td className={td + " text-right"}>
                <Money value={w.amount} className="text-positive" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}
