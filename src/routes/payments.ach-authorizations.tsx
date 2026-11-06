import { createFileRoute } from "@tanstack/react-router";
import { Plus, ShieldCheck } from "lucide-react";
import { achAuthorizations } from "@/components/dashboard/data";
import { Btn, Initials, Page, PageHeader, Table, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/ach-authorizations")({
  head: pageHead("ACH Authorizations", "Companies allowed to debit Post Oak Group's Oakline accounts by ACH, with limits."),
  component: AchPage,
});

function AchPage() {
  return (
    <Page>
      <PageHeader
        title="ACH Authorizations"
        actions={
          <Btn variant="primary" icon={Plus} onClick={() => demo("Add authorization")}>
            Add authorization
          </Btn>
        }
      />
      <div className="panel mb-6 flex items-start gap-3 px-5 py-4 text-[14px]">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
        <p className="text-muted-foreground">
          ACH debit protection is on. Only the companies below can pull money from your accounts — Oakline blocks any other ACH debit and notifies you.
        </p>
      </div>
      <Table minWidth={700}>
        <thead>
          <tr>
            <th className={th}>Company</th>
            <th className={th}>Company ID</th>
            <th className={th}>Account</th>
            <th className={th}>Limit</th>
            <th className={th}>Added</th>
          </tr>
        </thead>
        <tbody>
          {achAuthorizations.map((a) => (
            <tr key={a.id} className={tr} onClick={() => demo(a.company, `Company ID ${a.id}`)}>
              <td className={td}>
                <span className="flex items-center gap-3">
                  <Initials text={a.company.split(" ").slice(0, 2).map((p) => p[0]).join("")} />
                  {a.company}
                </span>
              </td>
              <td className={td + " tabular text-muted-foreground"}>{a.id}</td>
              <td className={td}>{a.account}</td>
              <td className={td}>{a.limit}</td>
              <td className={td + " text-muted-foreground"}>{a.added}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}
