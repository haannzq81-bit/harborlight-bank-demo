import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/invoicing/customers")({
  head: pageHead("Customers", "Customers you invoice through Oakline."),
  component: () => <PlaceholderPage title="Customers" />,
});
