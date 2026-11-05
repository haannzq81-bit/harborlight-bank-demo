import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/team-spend/budgets")({
  head: pageHead("Budgets", "Team budgets and spend against limits."),
  component: () => <PlaceholderPage title="Budgets" />,
});
