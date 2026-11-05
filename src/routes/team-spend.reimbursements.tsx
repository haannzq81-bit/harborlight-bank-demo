import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/team-spend/reimbursements")({
  head: pageHead("Reimbursements", "Employee reimbursement requests awaiting review."),
  component: () => <PlaceholderPage title="Reimbursements" />,
});
