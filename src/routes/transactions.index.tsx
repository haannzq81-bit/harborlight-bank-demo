import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/transactions/")({
  head: pageHead("Transactions", "Every Oakline transaction across accounts and cards."),
  component: () => <PlaceholderPage title="Transactions" />,
});
