import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, ChevronDown, FileText, Plus, Settings2 } from "lucide-react";
import { CardArt } from "@/components/dashboard/CardArt";
import { cards, creditCard, transactions } from "@/components/dashboard/data";
import { Money } from "@/components/dashboard/privacy";
import { Btn, Page, PageHeader, SectionTitle, StatusBadge, Table, demo, pageHead, td, th, tr } from "@/components/dashboard/ui";

export const Route = createFileRoute("/cards/credit-card")({
  head: pageHead("Credit Card", "Oakline Credit Card balance, limit, autopay, statements and recent card activity."),
  component: CreditCardPage,
});

function CreditCardPage() {
  const used = (creditCard.balance / creditCard.limit) * 100;
  const pending = (creditCard.pending / creditCard.limit) * 100;
  const creditCards = cards.filter((c) => c.account === "Credit Card").slice(0, 4);
  const activity = transactions.filter((t) => t.account === "Credit Card");

  return (
    <Page>
      <PageHeader
        title="Credit Card"
        actions={
          <>
            <Btn variant="ghost" icon={Settings2} onClick={() => demo("Autopay settings")}>
              Autopay
            </Btn>
            <Btn variant="primary" onClick={() => demo("Make a payment", "Pay your card balance from Operating — demo only.")}>
              Pay balance
            </Btn>
          </>
        }
      />

      <section className="panel px-6 py-5">
        <div className="flex flex-wrap items-start gap-x-14 gap-y-4">
          <div>
            <p className="text-[14px] text-muted-foreground">Current balance</p>
            <Money value={creditCard.balance} className="mt-1 block font-display text-[32px] tracking-tight" />
          </div>
          <div className="pt-1">
            <p className="text-[14px] text-muted-foreground">Pending</p>
            <Money value={creditCard.pending} className="mt-1 block text-[16px]" />
          </div>
          <div className="pt-1">
            <p className="text-[14px] text-muted-foreground">Available credit</p>
            <Money value={creditCard.available} className="mt-1 block text-[16px]" />
          </div>
          <div className="pt-1">
            <p className="text-[14px] text-muted-foreground">Limit</p>
            <Money value={creditCard.limit} showCents={false} className="mt-1 block text-[16px]" />
          </div>
        </div>
        <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-secondary">
          <div className="h-full bg-primary" style={{ width: `${used}%` }} />
          <div className="h-full bg-primary/35" style={{ width: `${pending}%` }} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4 text-[13.5px]">
          <CalendarClock className="size-4 text-muted-foreground" />
          <span>
            Autopay of statement balance <Money value={creditCard.statementBalance} /> scheduled for {creditCard.autopay} from Operating ••2210
          </span>
          <button type="button" onClick={() => demo("Edit autopay")} className="ml-auto font-medium text-primary hover:underline">
            Edit
          </button>
        </div>
      </section>

      <SectionTitle
        right={
          <Btn variant="ghost" icon={Plus} onClick={() => demo("Create credit card")}>
            New card
          </Btn>
        }
      >
        Cards on this account
      </SectionTitle>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {creditCards.map((c) => (
          <button key={c.last4} type="button" onClick={() => demo(c.nickname ?? `••${c.last4}`)} className="text-left">
            <CardArt last4={c.last4} holder={c.holder} type={c.type} />
            <p className="mt-2 truncate text-[13px] text-muted-foreground">{c.nickname ?? c.holder}</p>
          </button>
        ))}
      </div>

      <SectionTitle>Recent activity</SectionTitle>
      <Table minWidth={620}>
        <thead>
          <tr>
            <th className={th}>Date</th>
            <th className={th}>Merchant</th>
            <th className={th}>Card</th>
            <th className={th + " text-right"}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {activity.map((t, i) => (
            <tr key={i} className={tr} onClick={() => demo(t.party, t.method)}>
              <td className={td + " text-muted-foreground"}>{t.date}</td>
              <td className={td}>{t.party}</td>
              <td className={td + " text-muted-foreground"}>{t.method}</td>
              <td className={td + " text-right"}>
                <Money value={t.amount} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <SectionTitle
        right={
          <Btn variant="ghost" onClick={() => demo("All statements")}>
            All years <ChevronDown className="size-3.5" />
          </Btn>
        }
      >
        Statements
      </SectionTitle>
      <Table minWidth={560}>
        <thead>
          <tr>
            <th className={th}>Period</th>
            <th className={th}>Due</th>
            <th className={th}>Status</th>
            <th className={th + " text-right"}>Statement balance</th>
          </tr>
        </thead>
        <tbody>
          {creditCard.statements.map((s) => (
            <tr key={s.period} className={tr} onClick={() => demo(`${s.period} statement`, "PDF download is demo only.")}>
              <td className={td}>
                <span className="flex items-center gap-2">
                  <FileText className="size-4 text-muted-foreground" /> {s.period}
                </span>
              </td>
              <td className={td}>{s.due}</td>
              <td className={td}>
                <StatusBadge tone={s.status === "Paid" ? "positive" : "info"}>{s.status}</StatusBadge>
              </td>
              <td className={td + " text-right"}>
                <Money value={s.balance} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Page>
  );
}
