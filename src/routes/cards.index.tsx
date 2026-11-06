import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { CardArt } from "@/components/dashboard/CardArt";
import { cards, subscriptions } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, FilterMenu, Initials, Page, PageHeader, SectionTitle, StatusBadge, Table, UnderlineTabs, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/cards/")({
  head: pageHead("Cards", "Physical and virtual Oakline cards for the Post Oak Group team, plus recurring subscriptions."),
  component: CardsPage,
});

const tabs = [
  { id: "all", label: "All cards", count: cards.length },
  { id: "mine", label: "My cards", count: cards.filter((c) => c.you).length },
  { id: "subs", label: "Subscriptions", count: subscriptions.length },
] as const;

const typeFilter = ["Type", "Physical", "Virtual"] as const;

function CardsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const [type, setType] = useState<(typeof typeFilter)[number]>("Type");
  const [q, setQ] = useState("");
  const list = cards.filter(
    (c) =>
      (tab !== "mine" || c.you) &&
      (type === "Type" || c.type === type) &&
      (!q || `${c.holder} ${c.nickname ?? ""} ${c.last4}`.toLowerCase().includes(q.toLowerCase())),
  );
  const mine = cards.filter((c) => c.you);

  return (
    <Page>
      <PageHeader
        title="Cards"
        actions={
          <Btn variant="primary" icon={Plus} onClick={() => demo("Create card", "Issue a physical or virtual card — demo only.")}>
            Create card
          </Btn>
        }
      />

      {tab !== "subs" && (
        <>
          <h2 className="mb-3 text-[15px] text-muted-foreground">Your cards</h2>
          <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {mine.map((c) => (
              <button key={c.last4} type="button" onClick={() => demo(c.nickname ?? `Card ••${c.last4}`, `${c.type} · ${c.account}`)} className="text-left">
                <CardArt last4={c.last4} type={c.type} muted={c.status === "Frozen"} />
                <p className="mt-2 truncate text-[13.5px]">{c.nickname}</p>
                <p className="text-[12.5px] text-muted-foreground">
                  <Money value={c.spent} /> spent this month
                </p>
              </button>
            ))}
          </div>
        </>
      )}

      <UnderlineTabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === "subs" ? (
        <>
          <p className="mb-4 text-[14px] text-muted-foreground">Recurring charges Oakline detected on your cards.</p>
          <Table minWidth={680}>
            <thead>
              <tr>
                <th className={th}>Merchant</th>
                <th className={th}>Card</th>
                <th className={th}>Frequency</th>
                <th className={th}>Next charge</th>
                <th className={th + " text-right"}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s.merchant} className={tr} onClick={() => demo(s.merchant, `${s.cadence} on ${s.card}`)}>
                  <td className={td}>
                    <span className="flex items-center gap-3">
                      <Initials text={s.initials} />
                      {s.merchant}
                    </span>
                  </td>
                  <td className={td + " text-muted-foreground"}>{s.card}</td>
                  <td className={td}>{s.cadence}</td>
                  <td className={td}>{s.next}</td>
                  <td className={td + " text-right"}>
                    <Money value={s.amount} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <label className="flex h-8 w-full items-center gap-2 rounded-md border border-border bg-card px-3 text-[13.5px] sm:w-60">
              <Search className="size-3.5 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cards" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground" />
            </label>
            <FilterMenu label="Type" options={typeFilter} value={type} onChange={setType} />
            <FilterMenu label="Cardholder" options={["Cardholder", "Anthony Reyes", "Maya Lin", "Jordan Kim", "Priya Shah"] as const} />
            <FilterMenu label="Status" options={["Status", "Active", "Frozen", "Suspended"] as const} />
          </div>
          <Table minWidth={760}>
            <thead>
              <tr>
                <th className={th}>Cardholder</th>
                <th className={th}>Card</th>
                <th className={th + " text-right"}>Spent this month</th>
                <th className={th + " pl-8"}>Type</th>
                <th className={th}>Account</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.last4} className={tr} onClick={() => demo(c.nickname ?? `Card ••${c.last4}`, `${c.holder} · ${c.type}`)}>
                  <td className={td}>
                    <span className="flex items-center gap-3">
                      <Initials text={c.holder.split(" ").map((p) => p[0]).join("")} />
                      <span>
                        {c.holder}
                        {c.you && <span className="ml-1.5 text-muted-foreground">(You)</span>}
                      </span>
                    </span>
                  </td>
                  <td className={td}>
                    <span className="flex items-center gap-2">
                      <span className="text-muted-foreground">••{c.last4}</span>
                      {c.nickname && <span className="truncate">{c.nickname}</span>}
                      {c.status && <StatusBadge tone={c.status === "Single-use" ? "info" : "warning"}>{c.status}</StatusBadge>}
                    </span>
                  </td>
                  <td className={td + " text-right"}>
                    <Money value={c.spent} />
                  </td>
                  <td className={td + " pl-8"}>{c.type}</td>
                  <td className={td + " text-muted-foreground"}>{c.account}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {list.length === 0 && <p className="py-12 text-center text-[14px] text-muted-foreground">No cards match these filters.</p>}
        </>
      )}

      {tab === "all" && (
        <>
          <SectionTitle>Card controls</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Spend limits", "Set daily, monthly or per-transaction limits on any card."],
              ["Merchant controls", "Block categories like gambling and cash advances."],
              ["Instant freeze", "Freeze a lost card in one click and unfreeze anytime."],
            ].map(([t, b]) => (
              <button key={t} type="button" onClick={() => demo(t!)} className="panel px-5 py-4 text-left hover:shadow-pop">
                <p className="text-[14px] font-medium">{t}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{b}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </Page>
  );
}
