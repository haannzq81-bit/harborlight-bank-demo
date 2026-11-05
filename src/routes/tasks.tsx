import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  Banknote,
  ChevronUp,
  Inbox,
  ListChecks,
  ListFilter,
  Receipt,
  Settings,
  UserPlus,
  Wallet,
  ArrowUpDown,
  LayoutGrid,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { tasks, type Task } from "@/components/dashboard/data";
import { FilterMenu, Page, PageHeader, demo } from "@/components/dashboard/ui";

export const Route = createFileRoute("/tasks")({
  head: pageHeadTasks(),
  component: TasksPage,
});

function pageHeadTasks() {
  const title = "Tasks — Oakline Banking";
  const description = "Approvals, receipts and requests waiting on your team in Oakline Banking.";
  return () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  });
}

const icons: Record<Task["icon"], typeof Inbox> = {
  spend: Wallet,
  receipt: Receipt,
  category: ListChecks,
  invite: UserPlus,
  payment: Banknote,
  setting: Settings,
  reimburse: Inbox,
};

function Group({ title, items, done, onDone }: { title: string; items: Task[]; done: Set<string>; onDone: (t: string) => void }) {
  const [open, setOpen] = useState(true);
  return (
    <section className="mb-6">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 rounded-md bg-secondary px-3 py-2.5 text-[14px] font-medium"
      >
        {title} <span className="tabular">{items.length}</span>
        <ChevronUp className={cn("size-4 transition-transform", !open && "rotate-180")} />
      </button>
      {open && (
        <div>
          <div className="flex px-0 py-2.5 text-[12.5px] text-muted-foreground">
            <span className="flex-1">Description</span>
            <span className="hidden w-24 items-center gap-1 sm:flex">
              Due by <ArrowUp className="size-3" />
            </span>
            <span className="w-16 text-right">Received</span>
          </div>
          <ul>
            {items.map((t) => {
              const Icon = icons[t.icon];
              const isDone = done.has(t.text);
              return (
                <li key={t.text} className="group flex items-center gap-3 border-t border-border py-3 text-[14px]">
                  <Icon className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.6} />
                  <button
                    type="button"
                    onClick={() => demo("Task details", t.text)}
                    className={cn("min-w-0 flex-1 truncate text-left", isDone && "text-muted-foreground line-through")}
                  >
                    {t.text}
                  </button>
                  <button
                    type="button"
                    onClick={() => onDone(t.text)}
                    className={cn(
                      "hidden h-7 items-center gap-1 rounded-full px-2.5 text-[12.5px] transition-colors sm:inline-flex",
                      isDone ? "bg-primary-soft text-primary" : "bg-secondary opacity-0 group-hover:opacity-100",
                    )}
                  >
                    <Check className="size-3" /> {isDone ? "Done" : "Approve"}
                  </button>
                  <span className="hidden w-24 text-muted-foreground sm:block">—</span>
                  <span className="w-16 text-right tabular">{t.received}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

function TasksPage() {
  const [status, setStatus] = useState<"Incomplete" | "Completed" | "All">("Incomplete");
  const [done, setDone] = useState<Set<string>>(new Set());
  const toggle = (t: string) =>
    setDone((d) => {
      const n = new Set(d);
      if (n.has(t)) n.delete(t);
      else n.add(t);
      return n;
    });
  const visible = tasks.filter((t) => (status === "All" ? true : status === "Completed" ? done.has(t.text) : !done.has(t.text)));

  return (
    <Page>
      <PageHeader title="Tasks" />
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <FilterMenu label="Incomplete" options={["Incomplete", "Completed", "All"] as const} value={status} onChange={setStatus} />
        <button type="button" aria-label="More filters" onClick={() => demo("More filters")} className="inline-flex size-8 items-center justify-center rounded-md border border-border hover:bg-muted">
          <ListFilter className="size-3.5" />
        </button>
        <FilterMenu label="Category" options={["Category", "Approvals", "Receipts", "Payments", "Settings"] as const} />
        <div className="ml-auto flex gap-2">
          <FilterMenu label="Urgency" icon={LayoutGrid} options={["Urgency", "None"] as const} />
          <FilterMenu label="Due by" icon={ArrowUpDown} options={["Due by", "Received"] as const} />
        </div>
      </div>
      {visible.length === 0 ? (
        <p className="py-16 text-center text-[14px] text-muted-foreground">Nothing here — you're all caught up.</p>
      ) : (
        <>
          {visible.some((t) => t.urgent) && <Group title="Urgent" items={visible.filter((t) => t.urgent)} done={done} onDone={toggle} />}
          <Group title="Remaining" items={visible.filter((t) => !t.urgent)} done={done} onDone={toggle} />
        </>
      )}
    </Page>
  );
}
