import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { policies } from "@/components/dashboard/data";
import { Btn, Page, PageHeader, Table, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/team-spend/policies")({
  head: pageHead("Policies", "Spend policies for receipts, notes, categories and merchant controls on Oakline cards."),
  component: PoliciesPage,
});

function PoliciesPage() {
  const [active, setActive] = useState(() => policies.map((p) => p.active));

  return (
    <Page>
      <PageHeader
        title="Policies"
        actions={
          <Btn variant="primary" icon={Plus} onClick={() => demo("Create policy")}>
            Create policy
          </Btn>
        }
      />
      <p className="mb-5 max-w-xl text-[14px] text-muted-foreground">
        Policies set the rules your team follows when spending on Oakline cards. Oakline reminds cardholders automatically and flags anything out of policy in Tasks.
      </p>
      <Table minWidth={640}>
        <thead>
          <tr>
            <th className={th}>Policy</th>
            <th className={th}>Rule</th>
            <th className={th}>Applies to</th>
            <th className={th + " text-right"}>Active</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((p, i) => (
            <tr key={p.name} className={tr} onClick={() => demo(p.name, p.rule)}>
              <td className={td}>{p.name}</td>
              <td className={td + " text-muted-foreground"}>{p.rule}</td>
              <td className={td}>{p.applies}</td>
              <td className={td + " text-right"} onClick={(e) => e.stopPropagation()}>
                <Switch
                  aria-label={`Toggle ${p.name}`}
                  checked={active[i] ?? false}
                  onCheckedChange={(v) => setActive((a) => a.map((x, j) => (j === i ? v : x)))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}
