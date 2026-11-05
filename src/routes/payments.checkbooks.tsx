import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/payments/checkbooks")({
  head: pageHead("Checkbooks", "Order and track Oakline checkbooks."),
  component: () => <PlaceholderPage title="Checkbooks" />,
});
