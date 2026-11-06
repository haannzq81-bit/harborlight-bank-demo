import { createFileRoute } from "@tanstack/react-router";
import { BookCopy, Camera, Plus } from "lucide-react";
import { checkbookOrders } from "@/components/dashboard/data";
import { Btn, Page, PageHeader, SectionTitle, StatusBadge, Table, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/checkbooks")({
  head: pageHead("Checkbooks", "Order Oakline business checkbooks and deposit checks by phone."),
  component: CheckbooksPage,
});

function CheckbooksPage() {
  return (
    <Page>
      <PageHeader
        title="Checkbooks"
        actions={
          <Btn variant="primary" icon={Plus} onClick={() => demo("Order checkbook", "Arrives in 7–10 business days — demo only.")}>
            Order checkbook
          </Btn>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        <button type="button" onClick={() => demo("Order checkbook")} className="panel flex items-start gap-4 px-5 py-5 text-left hover:shadow-pop">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary-soft text-primary">
            <BookCopy className="size-5" />
          </span>
          <span>
            <span className="block text-[14px] font-medium">Order business checks</span>
            <span className="mt-1 block text-[13px] text-muted-foreground">100 checks per book, printed with your Post Oak Group details. Free on Oakline.</span>
          </span>
        </button>
        <button type="button" onClick={() => demo("Deposit a check", "Use the Oakline mobile app — demo only.")} className="panel flex items-start gap-4 px-5 py-5 text-left hover:shadow-pop">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary-soft text-primary">
            <Camera className="size-5" />
          </span>
          <span>
            <span className="block text-[14px] font-medium">Deposit a check</span>
            <span className="mt-1 block text-[13px] text-muted-foreground">Snap a photo in the Oakline app. Funds usually available next business day.</span>
          </span>
        </button>
      </div>

      <SectionTitle>Orders</SectionTitle>
      <Table minWidth={600}>
        <thead>
          <tr>
            <th className={th}>Ordered</th>
            <th className={th}>Account</th>
            <th className={th}>Check numbers</th>
            <th className={th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {checkbookOrders.map((o) => (
            <tr key={o.range} className={tr} onClick={() => demo(`Checkbook ${o.range}`)}>
              <td className={td}>{o.ordered}</td>
              <td className={td}>{o.account}</td>
              <td className={td + " tabular text-muted-foreground"}>{o.range}</td>
              <td className={td}>
                <StatusBadge tone="positive">{o.status}</StatusBadge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}
