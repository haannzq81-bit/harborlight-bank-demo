import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/invoicing/recurring")({
  head: pageHead("Recurring Series", "Recurring invoice series."),
  component: () => <PlaceholderPage title="Recurring Series" />,
});
