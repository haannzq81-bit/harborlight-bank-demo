import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/transactions/insights")({
  head: pageHead("Insights", "Spending and cash flow insights for Post Oak Group."),
  component: () => <PlaceholderPage title="Insights" />,
});
