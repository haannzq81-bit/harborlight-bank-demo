import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/team-spend/")({
  head: pageHead("Team Spend", "Team spend by category, budgets, policies and reimbursements."),
  component: () => <PlaceholderPage title="Team Spend" />,
});
