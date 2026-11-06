import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2, Plus, Search, Send } from "lucide-react";
import { recipients } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, FilterMenu, Initials, Page, PageHeader, StatusBadge, Table, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/recipients")({
  head: pageHead("Recipients", "Vendors, contractors and people Post Oak Group pays from Oakline, with totals and tax documents."),
  component: RecipientsPage,
});

const statusFilter = ["Status", "Active", "Pending details"] as const;

function RecipientsPage() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof statusFilter)[number]>("Status");
  const list = recipients.filter(
    (r) =>
      (!q || r.name.toLowerCase().includes(q.toLowerCase())) &&
      (status === "Status" || (status === "Pending details" ? r.status === "Pending details" : r.status === "")),
  );

  return (
    <Page>
      <PageHeader
        title="Recipients"
        actions={
          <>
            <Btn variant="ghost" icon={Send} onClick={() => demo("Send money", "Demo only — no money moves.")}>
              Send
            </Btn>
            <Btn variant="primary" icon={Plus} onClick={() => demo("Add recipient")}>
              Add recipient
            </Btn>
          </>
        }
      />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <label className="flex h-8 w-full items-center gap-2 rounded-md border border-border bg-card px-3 text-[13.5px] sm:w-64">
          <Search className="size-3.5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search recipients" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground" />
        </label>
        <FilterMenu label="Status" options={statusFilter} value={status} onChange={setStatus} />
        <FilterMenu label="Payment method" options={["Payment method", "ACH", "Wire", "Check"] as const} />
      </div>
      <Table minWidth={720}>
        <thead>
          <tr>
            <th className={th}>Name</th>
            <th className={th + " text-right"}>Total paid</th>
            <th className={th + " pl-8"}>Last paid</th>
            <th className={th}>Tax docs</th>
            <th className={th}></th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.name} className={tr} onClick={() => demo(r.name)}>
              <td className={td}>
                <span className="flex items-center gap-3">
                  <Initials text={r.initials} />
                  {r.name}
                  {r.status && <StatusBadge tone="warning">{r.status}</StatusBadge>}
                </span>
              </td>
              <td className={td + " text-right"}>
                <Money value={r.total} />
              </td>
              <td className={td + " pl-8 text-muted-foreground"}>{r.last}</td>
              <td className={td}>
                {r.taxDocs ? (
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <FileCheck2 className="size-3.5 text-positive" /> W-9 on file
                  </span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
              <td className={td + " text-right"}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    demo(`Pay ${r.name}`, "Demo only — no money moves.");
                  }}
                  className="rounded-full bg-secondary px-3 py-1 text-[12.5px] hover:bg-accent"
                >
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {list.length === 0 && <p className="py-14 text-center text-[14px] text-muted-foreground">No recipients match.</p>}
    </Page>
  );
}
