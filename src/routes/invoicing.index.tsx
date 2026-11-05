import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/invoicing/")({
  head: pageHead("Invoicing", "Invoices sent to customers: open, overdue and paid."),
  component: () => <PlaceholderPage title="Invoicing" />,
});
