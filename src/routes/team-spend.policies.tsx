import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/team-spend/policies")({
  head: pageHead("Policies", "Spend policies applied to Oakline cards."),
  component: () => <PlaceholderPage title="Policies" />,
});
