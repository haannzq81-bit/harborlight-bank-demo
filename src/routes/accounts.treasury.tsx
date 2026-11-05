import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ArrowUpRight, ChevronDown, ChevronRight, FileText, Info, Pencil } from "lucide-react";
import { balanceSeries, treasury } from "@/components/dashboard/data";
import { Money, usePrivacy } from "@/components/dashboard/privacy";
import { Btn, Page, PageHeader, SectionTitle, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/accounts/treasury")({
  head: pageHead("Treasury", "Oakline Treasury: idle cash in government money funds and U.S. Treasury bills, with yield and holdings."),
  component: TreasuryPage,
});

function TreasuryPage() {
  const { hidden } = usePrivacy();
  const data = useMemo(
    () => balanceSeries(180).map((p, i, arr) => ({ ...p, balance: treasury.balance * (0.72 + 0.28 * (i / (arr.length - 1))) + Math.sin(i / 9) * 9000 })),
    [],
  );
  const ticks = [data[0]!.label, data[60]!.label, data[120]!.label, data[179]!.label];

  return (
    <Page>
      <PageHeader
        title="Treasury"
        actions={
          <>
            <Btn variant="ghost" icon={FileText} onClick={() => demo("Treasury documents")}>
              Documents
            </Btn>
            <Btn onClick={() => demo("Transfer funds")}>
              Transfer funds <ChevronDown className="size-3.5" />
            </Btn>
          </>
        }
      />
      <div className="grid gap-6 md:grid-cols-[1.6fr_1fr]">
        <section className="panel overflow-hidden">
          <div className="px-6 pt-5">
            <p className="flex items-center gap-1 text-[14px] text-muted-foreground">
              Balance <Info className="size-3.5" />
            </p>
            <Money value={treasury.balance} className="mt-1 block font-display text-[30px] tracking-tight" />
            <p className="mt-2 inline-flex items-center gap-1 text-[14px]">
              Last 6 months <ChevronDown className="size-3.5" />
            </p>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 12, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="trsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.16} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <YAxis hide domain={["dataMin - 20000", "dataMax + 10000"]} />
                <XAxis dataKey="label" ticks={ticks} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} height={28} />
                <Tooltip
                  content={({ active, payload }) =>
                    active && payload?.[0] ? (
                      <div className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-pop">
                        {payload[0].payload.label} · {hidden ? "$••••" : `$${Math.round(Number(payload[0].value)).toLocaleString("en-US")}`}
                      </div>
                    ) : null
                  }
                />
                <Area type="monotone" dataKey="balance" stroke="var(--color-primary)" strokeWidth={1.75} fill="url(#trsFill)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel flex flex-col">
          <div className="border-b border-border px-6 py-5">
            <div className="flex items-center justify-between">
              <p className="text-[14px]">Portfolio setup</p>
              <button type="button" aria-label="Edit portfolio" onClick={() => demo("Edit portfolio")} className="inline-flex size-8 items-center justify-center rounded-full bg-secondary">
                <Pencil className="size-3.5" />
              </button>
            </div>
            <div className="mt-3 flex h-3 overflow-hidden rounded-full">
              <div className="w-[36%] bg-primary" />
              <div className="w-[29%] bg-chart-2" />
              <div className="flex-1 bg-primary-soft" />
            </div>
            <div className="mt-2 flex justify-between text-[11.5px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-primary" /> Near-term</span>
              <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-chart-2" /> Reserve</span>
              <span className="flex items-center gap-1"><span className="size-1.5 rounded-full bg-primary-soft" /> Long-term</span>
            </div>
          </div>
          <dl className="space-y-3 border-b border-border px-6 py-5 text-[14px]">
            <div className="flex justify-between"><dt className="text-muted-foreground">Net yield</dt><dd className="text-positive">{treasury.netYield}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Cash coverage</dt><dd>{treasury.coverage}</dd></div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">All time earnings</dt>
              <dd className="flex items-center gap-1"><ArrowUpRight className="size-3.5 text-positive" /><Money value={treasury.earnings} plain /></dd>
            </div>
          </dl>
          <button type="button" onClick={() => demo("Auto transfer rule")} className="flex items-center gap-1 px-6 py-4 text-left text-[14px] hover:bg-muted">
            Maintain Operating at $1.2M <ChevronRight className="size-3.5" />
          </button>
        </section>
      </div>

      <SectionTitle>Holdings</SectionTitle>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-[14px]">
          <thead>
            <tr>
              <th className={th + " pl-0"}>Holding</th>
              <th className={th}>Liquidity</th>
              <th className={th}>Maturity</th>
              <th className={th + " text-right"}>Yield</th>
              <th className={th + " text-right"}>Value</th>
            </tr>
          </thead>
          <tbody>
            {treasury.holdings.map((h) => (
              <tr key={h.name} className={tr} onClick={() => demo(h.name)}>
                <td className={td + " pl-0"}>{h.name}</td>
                <td className={td + " text-muted-foreground"}>{h.liquidity}</td>
                <td className={td + " text-muted-foreground"}>{h.maturity}</td>
                <td className={td + " text-right text-positive"}>{h.yield}</td>
                <td className={td + " text-right"}><Money value={h.value} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-8 rounded-lg bg-muted px-4 py-3 text-[12.5px] text-muted-foreground">
        Demo disclosure: Oakline Treasury figures are fictional. Treasury products would be offered through a registered investment adviser and are not FDIC insured.
      </p>
    </Page>
  );
}
