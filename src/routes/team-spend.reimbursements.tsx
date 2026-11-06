import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check as CheckIcon, Plus } from "lucide-react";
import { reimbursements } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, Initials, Page, PageHeader, StatusBadge, Table, UnderlineTabs, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/team-spend/reimbursements")({
  head: pageHead("Reimbursements", "Employee out-of-pocket expenses and mileage awaiting review and payout."),
  component: ReimbursementsPage,
});

function ReimbursementsPage() {
  const [approved, setApproved] = useState<Set<number>>(new Set());
  const rows = reimbursements.map((r, i) => ({ ...r, i, status: approved.has(i) ? "Approved" : r.status }));
  const counts = {
    review: rows.filter((r) => r.status === "Needs review").length,
    approved: rows.filter((r) => r.status === "Approved").length,
    paid: rows.filter((r) => r.status === "Paid").length,
  };
  const tabs = [
    { id: "Needs review", label: "Needs review", count: counts.review },
    { id: "Approved", label: "Approved", count: counts.approved },
    { id: "Paid", label: "Paid", count: counts.paid },
  ] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("Needs review");
  const list = rows.filter((r) => r.status === tab);

  return (
    <Page>
      <PageHeader
        title="Reimbursements"
        actions={
          <Btn variant="primary" icon={Plus} onClick={() => demo("Request reimbursement")}>
            New request
          </Btn>
        }
      />
      <UnderlineTabs tabs={tabs} value={tab} onChange={setTab} />
      <Table minWidth={700}>
        <thead>
          <tr>
            <th className={th}>Submitted by</th>
            <th className={th}>Expense</th>
            <th className={th}>Date</th>
            <th className={th + " text-right"}>Amount</th>
            <th className={th + " text-right"}>Status</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.i} className={tr} onClick={() => demo(r.merchant, `Submitted by ${r.who}`)}>
              <td className={td}>
                <span className="flex items-center gap-3">
                  <Initials text={r.initials} />
                  {r.who}
                </span>
              </td>
              <td className={td}>{r.merchant}</td>
              <td className={td + " text-muted-foreground"}>{r.date}</td>
              <td className={td + " text-right"}>
                <Money value={r.amount} />
              </td>
              <td className={td + " text-right"}>
                {r.status === "Needs review" ? (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setApproved((s) => new Set(s).add(r.i));
                      demo("Reimbursement approved", `${r.who} · ${r.merchant}`);
                    }}
                    className="inline-flex h-7 items-center gap-1 rounded-full bg-secondary px-3 text-[12.5px] hover:bg-accent"
                  >
                    <CheckIcon className="size-3" /> Approve
                  </button>
                ) : (
                  <StatusBadge tone={r.status === "Paid" ? "positive" : "info"}>{r.status}</StatusBadge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {list.length === 0 && <p className="py-14 text-center text-[14px] text-muted-foreground">Nothing here yet.</p>}
    </Page>
  );
}
