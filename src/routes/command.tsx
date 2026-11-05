import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUp, CreditCard, LineChart, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { months, totalBalance, user } from "@/components/dashboard/data";
import { compact } from "@/components/dashboard/privacy";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/command")({
  head: pageHead("Command", "Ask Oakline a question or give a command about your business finances."),
  component: CommandPage,
});

const prompts = [
  { icon: CreditCard, label: "Issue new card" },
  { icon: LineChart, label: "Compare monthly balances" },
  { icon: Wallet, label: "What did we spend on software?" },
];

function answer(q: string) {
  const s = q.toLowerCase();
  if (s.includes("card"))
    return "I can set up a new virtual card. Who should it be for, which account should it draw from, and what monthly limit would you like? (In the demo, no card is created.)";
  if (s.includes("balance") || s.includes("compare"))
    return `Your total balance is ${compact(totalBalance)}. Money in was ${months.map((m) => `${m.label}: ${compact(m.moneyIn)}`).join(", ")}. October was your strongest month this quarter.`;
  if (s.includes("software") || s.includes("spend"))
    return "Software spend over the last 30 days was $74.2K, led by Amazon Web Services ($12.9K), Linear ($3.9K) and Slack ($1.5K). That's 4% higher than September.";
  return "Here's what I found: you have 10 open tasks, 3 overdue invoices worth $39K, and payroll of about $156.9K runs on Nov 15. Ask me to dig into any of these.";
}

function CommandPage() {
  const [value, setValue] = useState("");
  const [chat, setChat] = useState<{ role: "you" | "oakline"; text: string }[]>([]);

  const send = (q: string) => {
    if (!q.trim()) return;
    setChat((c) => [...c, { role: "you", text: q }, { role: "oakline", text: answer(q) }]);
    setValue("");
  };

  return (
    <main className={cn("mx-auto flex w-full max-w-[640px] flex-col px-4 pb-24", chat.length ? "pt-10" : "min-h-[calc(100vh-8rem)] justify-center")}>
      {chat.length === 0 && <h1 className="text-center font-display text-[30px] font-normal tracking-tight">Hey {user.firstName}, ready when you are</h1>}

      {chat.length > 0 && (
        <div className="mb-6 space-y-4">
          {chat.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "you" && "justify-end")}>
              <p
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed",
                  m.role === "you" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground",
                )}
              >
                {m.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(value);
        }}
        className="mt-8 flex items-center gap-2 rounded-2xl border border-foreground/60 bg-card py-2 pl-4 pr-2 focus-within:border-primary"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask a question or give a command"
          className="h-8 flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
        />
        <button type="submit" aria-label="Send" className="inline-flex size-8 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-accent">
          <ArrowUp className="size-4" />
        </button>
      </form>

      {chat.length === 0 && (
        <>
          <p className="mt-8 text-center text-[13.5px] text-muted-foreground">Try one of these prompts out:</p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {prompts.map(({ icon: Icon, label }) => (
              <button key={label} type="button" onClick={() => send(label)} className="inline-flex h-8 items-center gap-1.5 rounded-full bg-secondary px-3.5 text-[13.5px] hover:bg-accent">
                <Icon className="size-3.5" /> {label}
              </button>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
