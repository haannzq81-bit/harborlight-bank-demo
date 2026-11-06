import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Upload } from "lucide-react";
import { bills, type Bill } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, Check, FeedbackBadge, Initials, Page, PageHeader, StatTile, StatusBadge, Table, UnderlineTabs, demo, pageHead, td, th, tr, type Tone } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/bill-pay")({
  head: pageHead("Bill Pay", "Vendor bills in your inbox, awaiting approval, scheduled and paid from Oakline."),
  component: BillPayPage,
});

const tone: Record<Bill["status"], Tone> = {
  Overdue: "danger",
  "Needs approval": "warning",
  Scheduled: "info",
  Paid: "positive",
  Inbox: "neutral",
};

const tabs = [
  { id: "all", label: "All bills", count: bills.length },
  { id: "Needs approval", label: "Awaiting approval", count: bills.filter((b) => b.status === "Needs approval").length },
  { id: "Scheduled", label: "Scheduled", count: bills.filter((b) => b.status === "Scheduled").length },
  { id: "Overdue", label: "Overdue", count: bills.filter((b) => b.status === "Overdue").length },
  { id: "Paid", label: "Paid", count: bills.filter((b) => b.status === "Paid").length },
] as const;

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

function BillPayPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const list = tab === "all" ? bills : bills.filter((b) => b.status === tab);
  const sum = (s: Bill["status"]) => bills.filter((b) => b.status === s).reduce((t, b) => t + b.amount, 0);

  return (
    <Page className="max-w-[1080px]">
      <PageHeader
        title="Bill Pay"
        badge={<FeedbackBadge />}
        actions={
          <>
            <Btn variant="ghost" icon={Mail} onClick={() => demo("Forward bills", "Email bills to bills@postoakgroup.oakline.com — demo only.")}>
              Email bills
            </Btn>
            <Btn variant="primary" icon={Upload} onClick={() => demo("Upload bill")}>
              Upload bill
            </Btn>
          </>
        }
      />

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <StatTile value={<Money value={sum("Overdue")} />} label="Overdue" tone="warning" sub={`${bills.filter((b) => b.status === "Overdue").length} bills`} onClick={() => setTab("Overdue")} />
        <StatTile value={<Money value={sum("Needs approval")} />} label="Awaiting approval" sub="1 bill" onClick={() => setTab("Needs approval")} />
        <StatTile value={<Money value={sum("Scheduled")} />} label="Scheduled" sub="Next payment Nov 15" onClick={() => setTab("Scheduled")} />
      </div>

      <UnderlineTabs tabs={tabs} value={tab} onChange={setTab} />
      <Table minWidth={860}>
        <thead>
          <tr>
            <th className={th + " w-8"}>
              <Check label="Select all bills" />
            </th>
            <th className={th}>Due date</th>
            <th className={th}>Status</th>
            <th className={th}>Recipient</th>
            <th className={th + " text-right"}>Amount</th>
            <th className={th + " pl-8"}>Invoice #</th>
            <th className={th}>Last updated</th>
          </tr>
        </thead>
        <tbody>
          {list.map((b) => (
            <tr key={b.invoice} className={tr} onClick={() => demo(`${b.recipient} · ${b.invoice}`, `Due ${b.due}`)}>
              <td className={td}>
                <Check label={`Select ${b.invoice}`} />
              </td>
              <td className={td + " whitespace-nowrap"}>{b.due}</td>
              <td className={td}>
                <StatusBadge tone={tone[b.status]}>{b.status}</StatusBadge>
              </td>
              <td className={td}>
                <span className="flex items-center gap-3">
                  <Initials text={initialsOf(b.recipient)} />
                  {b.recipient}
                </span>
              </td>
              <td className={td + " text-right"}>
                <Money value={b.amount} />
              </td>
              <td className={td + " pl-8 text-muted-foreground"}>{b.invoice}</td>
              <td className={td + " text-muted-foreground"}>
                <span className="inline-flex items-center gap-1.5">
                  {b.source === "email" ? <Mail className="size-3.5" /> : <Upload className="size-3.5" />}
                  {b.updated}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}
