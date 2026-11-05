import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeftRight, BadgeCheck, ChevronDown, Info, Link2, Plus, RefreshCw } from "lucide-react";
import { AccountGlyph } from "@/components/dashboard/BrandMark";
import { allAccounts, linkedAccounts, pendingDeposits, pendingTransfers, totalBalance } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, FeedbackBadge, Page, PageHeader, StatusBadge, UnderlineTabs, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/accounts/")({
  head: pageHead("Accounts", "All Oakline checking, savings, treasury and credit accounts with balances and auto transfer rules."),
  component: AccountsPage,
});

const tabs = [
  { id: "oakline", label: "Oakline accounts" },
  { id: "linked", label: "Linked accounts" },
  { id: "rules", label: "Auto transfer rules" },
] as const;

function AccountsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("oakline");
  const navigate = useNavigate();

  return (
    <Page>
      <PageHeader
        title="Accounts"
        badge={<FeedbackBadge />}
        actions={
          <>
            <Btn variant="ghost" icon={ArrowLeftRight} onClick={() => demo("Transfer funds")}>
              Transfer funds
            </Btn>
            <Btn onClick={() => demo("Add account")}>
              Add account <ChevronDown className="size-3.5" />
            </Btn>
          </>
        }
      />
      <UnderlineTabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === "oakline" && (
        <>
          <div className="mt-8 flex flex-wrap items-end gap-x-16 gap-y-4">
            <div>
              <p className="flex items-center gap-1 text-[14px] text-muted-foreground">
                Available <Info className="size-3.5" />
              </p>
              <p className="mt-1 flex items-center gap-2">
                <Money value={totalBalance} className="font-display text-[34px] tracking-tight" />
                <BadgeCheck className="size-5 fill-primary text-primary-foreground" />
              </p>
            </div>
            <div className="pb-2">
              <p className="text-[14px] text-muted-foreground">Pending deposits</p>
              <Money value={pendingDeposits} className="text-[15px] text-muted-foreground" />
            </div>
            <div className="pb-2">
              <p className="text-[14px] text-muted-foreground">Pending transfers</p>
              <Money value={pendingTransfers} className="text-[15px] text-muted-foreground" />
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[680px] text-[14px]">
              <thead>
                <tr>
                  <th className={th + " pl-0"}>Account</th>
                  <th className={th + " text-right"}>Balance</th>
                  <th className={th + " pl-12"}>Auto transfer rules</th>
                </tr>
              </thead>
              <tbody>
                {allAccounts.map((a) => (
                  <tr
                    key={a.id}
                    className={tr}
                    onClick={() =>
                      a.id === "credit" ? navigate({ to: "/cards/credit-card" }) : a.id === "treasury" ? navigate({ to: "/accounts/treasury" }) : demo(`${a.name} ••${a.last4}`, a.kind)
                    }
                  >
                    <td className={td + " pl-0"}>
                      <span className="flex items-center gap-3">
                        <AccountGlyph className="size-8" />
                        <span>
                          <span className="block">{a.name}</span>
                          <span className="block text-[12.5px] text-muted-foreground">
                            {a.kind} ••{a.last4}
                          </span>
                        </span>
                      </span>
                    </td>
                    <td className={td + " text-right"}>
                      <Money value={a.balance} />
                    </td>
                    <td className={td + " pl-12"}>
                      {a.rule ? (
                        <span className="flex items-start gap-2">
                          <RefreshCw className="mt-0.5 size-3.5 text-muted-foreground" />
                          <span>
                            <span className="block">{a.rule.title}</span>
                            <span className="block text-[12.5px] text-muted-foreground">{a.rule.detail}</span>
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-foreground">
                          <Plus className="size-3.5" /> Create rule
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className={tr} onClick={() => demo("Create account")}>
                  <td className={td + " pl-0"} colSpan={3}>
                    <span className="flex items-center gap-3">
                      <span className="inline-flex size-8 items-center justify-center rounded-full bg-secondary">
                        <Plus className="size-4" />
                      </span>
                      Create account
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "linked" && (
        <div className="mt-2">
          <table className="w-full text-[14px]">
            <thead>
              <tr>
                <th className={th + " pl-0"}>Institution</th>
                <th className={th}>Status</th>
                <th className={th + " text-right"}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {linkedAccounts.map((l) => (
                <tr key={l.detail} className={tr} onClick={() => demo(l.name)}>
                  <td className={td + " pl-0"}>
                    <span className="flex items-center gap-3">
                      <span className="inline-flex size-8 items-center justify-center rounded-full bg-secondary">
                        <Link2 className="size-4 text-muted-foreground" />
                      </span>
                      <span>
                        <span className="block">{l.name}</span>
                        <span className="block text-[12.5px] text-muted-foreground">{l.detail}</span>
                      </span>
                    </span>
                  </td>
                  <td className={td}>
                    <StatusBadge tone={l.status === "Connected" ? "positive" : "warning"}>{l.status}</StatusBadge>
                  </td>
                  <td className={td + " text-right"}>{l.balance === null ? "—" : <Money value={l.balance} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Btn className="mt-6" icon={Plus} onClick={() => demo("Link an external account")}>
            Link external account
          </Btn>
        </div>
      )}

      {tab === "rules" && (
        <ul className="mt-2">
          {allAccounts
            .filter((a) => a.rule)
            .map((a) => (
              <li key={a.id} className="flex items-center gap-3 border-t border-border py-4 text-[14px] first:border-0">
                <RefreshCw className="size-4 text-muted-foreground" />
                <span className="flex-1">
                  <span className="block">{a.rule!.title}</span>
                  <span className="block text-[12.5px] text-muted-foreground">
                    {a.name} · {a.rule!.detail}
                  </span>
                </span>
                <StatusBadge tone="positive">Active</StatusBadge>
              </li>
            ))}
          <li className="pt-4">
            <Btn icon={Plus} onClick={() => demo("Create rule")}>
              Create rule
            </Btn>
          </li>
        </ul>
      )}
    </Page>
  );
}
