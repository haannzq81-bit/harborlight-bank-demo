import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download } from "lucide-react";
import { months, teamSpendByCategory } from "@/components/dashboard/data";
import { Compact, Money, compact, usePrivacy } from "@/components/dashboard/privacy";
import { Btn, ChipTabs, FeedbackBadge, Initials, Page, PageHeader, SectionTitle, demo, pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/transactions/insights")({
  head: pageHead("Insights", "Cash flow, money in and money out insights for Post Oak Group on Oakline."),
  component: InsightsPage,
});

const views = ["Cash flow", "Money in", "Money out"] as const;

function InsightsPage() {
  const { hidden } = usePrivacy();
  const [view, setView] = useState<(typeof views)[number]>("Cash flow");
  const data = months.map((m) => ({ label: m.label.slice(0, 3), in: m.moneyIn, out: Math.abs(m.moneyOut) }));
  const totalIn = months.reduce((s, m) => s + m.moneyIn, 0);
  const totalOut = months.reduce((s, m) => s + m.moneyOut, 0);
  const last = months[months.length - 2]!;
  const catTotal = teamSpendByCategory.reduce((s, c) => s + c.value, 0);

  return (
    <Page>
      <PageHeader
        title="Insights"
        badge={<FeedbackBadge />}
        actions={
          <Btn variant="ghost" icon={Download} onClick={() => demo("Export insights")}>
            Export
          </Btn>
        }
      />
      <ChipTabs tabs={views} value={view} onChange={setView} />

      <section className="panel mt-5 px-6 py-5">
        <div className="flex flex-wrap gap-x-12 gap-y-3">
          <div>
            <p className="text-[13.5px] text-muted-foreground">Net change · last 3 months</p>
            <Money value={totalIn + totalOut} signed className="mt-0.5 block font-display text-[28px] tracking-tight" />
          </div>
          {view !== "Money out" && (
            <div>
              <p className="text-[13.5px] text-muted-foreground">Money in</p>
              <Money value={totalIn} className="mt-1.5 block text-[17px] text-positive" />
            </div>
          )}
          {view !== "Money in" && (
            <div>
              <p className="text-[13.5px] text-muted-foreground">Money out</p>
              <Money value={totalOut} className="mt-1.5 block text-[17px]" />
            </div>
          )}
        </div>
        <div className="mt-6 h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={6} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                width={56}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                tickFormatter={(v: number) => (hidden ? "••" : compact(v))}
              />
              <Tooltip
                cursor={{ fill: "var(--color-muted)" }}
                content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-pop">
                      <p className="font-medium">{label}</p>
                      {payload.map((p) => (
                        <p key={String(p.dataKey)}>
                          {p.dataKey === "in" ? "In" : "Out"} · {hidden ? "$••••" : compact(Number(p.value))}
                        </p>
                      ))}
                    </div>
                  ) : null
                }
              />
              {view !== "Money out" && <Bar dataKey="in" fill="var(--color-primary)" radius={[4, 4, 0, 0]} maxBarSize={44} isAnimationActive={false} />}
              {view !== "Money in" && <Bar dataKey="out" fill="var(--color-primary)" fillOpacity={0.3} radius={[4, 4, 0, 0]} maxBarSize={44} isAnimationActive={false} />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <SectionTitle>Top sources · {last.label}</SectionTitle>
          <ul className="panel divide-y divide-border">
            {last.sources.map((p) => (
              <li key={p.name} className="flex items-center gap-3 px-5 py-3 text-[14px]">
                <Initials text={p.initials} />
                <span className="flex-1 truncate">{p.name}</span>
                <Money value={p.amount} className="text-positive" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionTitle>Top spend · {last.label}</SectionTitle>
          <ul className="panel divide-y divide-border">
            {last.spend.map((p) => (
              <li key={p.name} className="flex items-center gap-3 px-5 py-3 text-[14px]">
                <Initials text={p.initials} />
                <span className="flex-1 truncate">{p.name}</span>
                <Money value={p.amount} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <SectionTitle>Card spend by category</SectionTitle>
      <section className="panel px-6 py-5">
        <div className="flex h-2.5 overflow-hidden rounded-full">
          {teamSpendByCategory.map((c, i) => (
            <div key={c.name} className="h-full bg-primary" style={{ width: `${(c.value / catTotal) * 100}%`, opacity: 1 - i * 0.14 }} />
          ))}
        </div>
        <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {teamSpendByCategory.map((c, i) => (
            <li key={c.name} className="flex items-center gap-2 text-[14px]">
              <span className="size-2 rounded-full bg-primary" style={{ opacity: 1 - i * 0.14 }} />
              <span className="flex-1">{c.name}</span>
              <span className="text-muted-foreground">{Math.round((c.value / catTotal) * 100)}%</span>
              <Compact value={c.value} className="w-14 text-right" />
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
