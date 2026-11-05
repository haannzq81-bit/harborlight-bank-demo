import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/ach-authorizations")({
  head: pageHead("ACH Authorizations", "Companies allowed to debit your Oakline accounts."),
  component: () => <PlaceholderPage title="ACH Authorizations" />,
});
