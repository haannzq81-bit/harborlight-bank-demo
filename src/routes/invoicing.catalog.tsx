import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/dashboard/PlaceholderPage";
import { pageHead } from "@/components/dashboard/ui";

export const Route = createFileRoute("/invoicing/catalog")({
  head: pageHead("Catalog", "Products and services you invoice for."),
  component: () => <PlaceholderPage title="Catalog" />,
});
