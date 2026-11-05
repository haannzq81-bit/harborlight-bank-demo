import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/bill-pay")({
  head: pageHead("Bill Pay", "Bills in your inbox, awaiting approval, scheduled and paid."),
  component: () => <PlaceholderPage title="Bill Pay" />,
});
